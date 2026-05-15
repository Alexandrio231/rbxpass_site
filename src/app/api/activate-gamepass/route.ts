import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { sendNewOrderTelegramNotification } from "@/lib/telegram";
import { getGamePassProductInfo } from "@/lib/roblox";
import { getRequiredGamepassPrice } from "@/lib/roblox-pricing";
import { syncOrderToGoogleSheets } from "@/lib/sheets-sync";
import { z } from "zod";
import { DEFAULT_STORE, detectStoreByCodePrefix, STORE_CONFIGS } from "@/lib/stores";

export const maxDuration = 60;

const bodySchema = z.object({
  code: z.string().min(1),
  productType: z.enum(["roblox", "fortnite", "pubg", "other"]).default("roblox"),
  gamepassUrl: z.string().url().optional(),
  gamepassId: z.string().regex(/^\d+$/).optional(),
  regionalPricingDisabled: z.boolean().optional(),
  manualPassCheckConfirmed: z.boolean().optional(),
  nickname: z.string().min(1).optional(),
  epicLogin: z.string().min(1).optional(),
  epicPassword: z.string().min(1).optional(),
  telegram: z.string().min(1).optional(),
  screenshotData: z.string().min(1).optional(),
});

const CODE_REGEX = {
  OLD: /^RBX100-[A-Z0-9]{4}-[A-Z0-9]{4}$/i,
  NEW: /^[A-Z0-9]{2,10}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{1}$/i,
} as const;

function verifyChecksum(code: string): boolean {
  if (CODE_REGEX.OLD.test(code)) return true;
  const parts = code.split("-");
  if (parts.length !== 4) return false;
  const [prefix, part1, part2, checksum] = parts;
  const base = `${prefix}-${part1}-${part2}`;
  const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let sum = 0;
  for (let i = 0; i < base.length; i++) sum += base.charCodeAt(i);
  const expected = CHARSET[sum % CHARSET.length];
  return checksum === expected;
}

function extractGamePassIdFromUrl(url: string): string | null {
  const match = url.match(/\/game-pass\/(\d+)/i);
  return match?.[1] ?? null;
}

function validateScreenshotData(
  screenshotData: string,
): { ext: "png" | "jpg" | "webp"; buffer: Buffer } | null {
  const match = /^data:(image\/(png|jpe?g|webp));base64,(.+)$/i.exec(screenshotData);
  if (!match) return null;

  const mime = match[1].toLowerCase();
  const ext: "png" | "jpg" | "webp" =
    mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
  const base64 = match[3];

  const estimatedBytes = (base64.length * 3) / 4;
  if (estimatedBytes > 5 * 1024 * 1024) return null;

  try {
    const buffer = Buffer.from(base64, "base64");
    return { ext, buffer };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => ({}));
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Неверные данные" }, { status: 400 });
    }

    const {
      code, gamepassUrl, gamepassId, regionalPricingDisabled,
      manualPassCheckConfirmed, nickname, productType,
      epicLogin, epicPassword, telegram, screenshotData,
    } = parsed.data;

    const normalizedCode = code.toUpperCase().trim();
    const isValidFormat = CODE_REGEX.OLD.test(normalizedCode) || CODE_REGEX.NEW.test(normalizedCode);
    if (!isValidFormat) {
      return NextResponse.json({ ok: false, error: "Неверный формат кода. Пример: RBX-ABCD-EFGH-5" }, { status: 400 });
    }

    if (CODE_REGEX.NEW.test(normalizedCode) && !verifyChecksum(normalizedCode)) {
      return NextResponse.json({ ok: false, error: "Неверная контрольная сумма кода" }, { status: 400 });
    }

    // Определяем магазин по префиксу кода
    const detectedStore = detectStoreByCodePrefix(normalizedCode);
    const store = detectedStore ?? DEFAULT_STORE;

    // Проверяем код в базе
    const codeRow = await prisma.legacyCode.findFirst({
      where: { code: normalizedCode, store },
    });

    if (!codeRow) {
      return NextResponse.json({ ok: false, error: "Код не найден" }, { status: 404 });
    }

    if (codeRow.status !== "active") {
      return NextResponse.json({ ok: false, error: "Код уже использован" }, { status: 409 });
    }

    const resolvedType = codeRow.product_type ?? productType;
    let resolvedGamepassId = "";
    let safeNickname = nickname?.trim() || "";
    const safeGamepassUrl = gamepassUrl?.trim() || "";
    const safeGamepassId = gamepassId?.trim() || "";

    if (resolvedType === "roblox") {
      if (!safeNickname || (!safeGamepassUrl && !safeGamepassId) || !telegram) {
        return NextResponse.json({ ok: false, error: "Укажите ник, ссылку или Pass ID и Telegram" }, { status: 400 });
      }

      if (!screenshotData) {
        return NextResponse.json({ ok: false, error: "Загрузите скриншот покупки" }, { status: 400 });
      }

      if (!regionalPricingDisabled) {
        return NextResponse.json({ ok: false, error: "Подтвердите, что выставили верную цену и отключили Regional Pricing" }, { status: 400 });
      }

      if (safeGamepassId) {
        resolvedGamepassId = safeGamepassId;
      } else {
        const extractedId = extractGamePassIdFromUrl(safeGamepassUrl);
        if (!extractedId) {
          return NextResponse.json({ ok: false, error: "Неверная ссылка на GamePass" }, { status: 400 });
        }
        resolvedGamepassId = extractedId;
      }

      // Проверяем GamePass через Roblox API
      const requiredPrice = getRequiredGamepassPrice(codeRow.nominal);
      let passInfo: Awaited<ReturnType<typeof getGamePassProductInfo>> | null = null;
      let passCheckSkipped = false;
      try {
        passInfo = await getGamePassProductInfo(resolvedGamepassId);
      } catch {
        if (!manualPassCheckConfirmed) {
          return NextResponse.json({ ok: false, error: "Не удалось проверить GamePass. Попробуйте позже." }, { status: 503 });
        }
        passCheckSkipped = true;
      }

      if (!passCheckSkipped && !passInfo) {
        return NextResponse.json({ ok: false, error: "GamePass не найден. Проверьте ссылку или Pass ID." }, { status: 400 });
      }

      if (!passCheckSkipped && passInfo?.IsForSale === false) {
        return NextResponse.json({ ok: false, error: "GamePass выключен из продажи. Включите и повторите." }, { status: 400 });
      }

      if (!passCheckSkipped && requiredPrice !== null && passInfo?.PriceInRobux !== requiredPrice) {
        return NextResponse.json({
          ok: false,
          error: `Неверная цена GamePass: сейчас ${passInfo?.PriceInRobux ?? "не указана"} R$, нужна ${requiredPrice} R$.`,
        }, { status: 400 });
      }
    }

    if (resolvedType === "fortnite") {
      if (!epicLogin || !epicPassword || !telegram) {
        return NextResponse.json({ ok: false, error: "Укажите логин, пароль Epic Games и Telegram" }, { status: 400 });
      }
      safeNickname = epicLogin.trim();
    }

    if ((resolvedType === "pubg" || resolvedType === "other") && !telegram) {
      return NextResponse.json({ ok: false, error: "Укажите Telegram для связи" }, { status: 400 });
    }

    // Validate screenshot
    let validatedScreenshot: { ext: "png" | "jpg" | "webp"; buffer: Buffer } | null = null;
    if (screenshotData) {
      validatedScreenshot = validateScreenshotData(screenshotData);
      if (!validatedScreenshot) {
        return NextResponse.json({ ok: false, error: "Неверный формат изображения или размер больше 5 МБ" }, { status: 400 });
      }
    }

    // Create order in transaction
    const shortCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const order = await prisma.$transaction(async (tx) => {
      const markResult = await tx.legacyCode.updateMany({
        where: { id: codeRow.id, status: "active" },
        data: { status: "used", used_at: new Date() },
      });

      if (markResult.count !== 1) {
        throw new Error("code_already_used");
      }

      return tx.order.create({
        data: {
          short_code: shortCode,
          code: normalizedCode,
          nickname: safeNickname || "-",
          user_id: resolvedType === "roblox" ? "gamepass_user" : "manual_user",
          gamepass_id: resolvedGamepassId || "-",
          gamepass_url: safeGamepassUrl || "-",
          product_type: resolvedType,
          store,
          contact_telegram: telegram?.trim() || null,
          epic_login: epicLogin?.trim() || null,
          epic_password: epicPassword?.trim() || null,
          status: "queued",
        },
      });
    });

    // Save screenshot
    if (validatedScreenshot) {
      try {
        const publicDir = path.join(process.cwd(), "public");
        const screenshotsDir = path.join(publicDir, "order-screenshots");
        await fs.mkdir(screenshotsDir, { recursive: true });

        const fileName = `order-${order.id}-${Date.now()}.${validatedScreenshot.ext}`;
        const filePath = path.join(screenshotsDir, fileName);
        await fs.writeFile(filePath, validatedScreenshot.buffer);

        const publicUrl = `/order-screenshots/${fileName}`;
        await prisma.order.update({
          where: { id: order.id },
          data: { screenshot_url: publicUrl },
        });
      } catch (e) {
        console.error("Failed to save order screenshot:", e);
      }
    }

    // Send Telegram notification
    const notifyGamepassUrl = safeGamepassUrl || (resolvedGamepassId ? `https://www.roblox.com/game-pass/${resolvedGamepassId}` : "-");

    await sendNewOrderTelegramNotification({
      amount: codeRow.nominal,
      gamepassUrl: notifyGamepassUrl,
      orderId: order.id,
      customerTelegram: order.contact_telegram ?? "-",
      activatedCode: code.trim().toUpperCase(),
      shortCode: order.short_code,
      storeName: STORE_CONFIGS[store]?.name ?? store,
      screenshotPath: (await prisma.order.findUnique({
        where: { id: order.id },
        select: { screenshot_url: true },
      }))?.screenshot_url ?? null,
    });

    // Sync to Google Sheets
    await syncOrderToGoogleSheets({
      id: order.id,
      shortCode: order.short_code,
      store: order.store,
      status: order.status,
      createdAtIso: order.created_at.toISOString(),
      gamepassUrl: order.gamepass_url,
      gamepassId: order.gamepass_id,
      codeNominal: codeRow.nominal,
      nickname: order.nickname,
      telegram: order.contact_telegram ?? null,
    });

    return NextResponse.json({
      ok: true,
      nominal: codeRow.nominal,
      order: {
        id: order.id,
        short_code: order.short_code,
        status: order.status,
        created_at: order.created_at,
      },
      message: `Код успешно активирован! Код заказа: ${order.short_code}`
    });
  } catch (error) {
    if (error instanceof Error && error.message === "code_already_used") {
      return NextResponse.json({ ok: false, error: "Код уже использован" }, { status: 409 });
    }

    console.error("Activate GamePass error:", error);
    return NextResponse.json({ ok: false, error: "Ошибка сервера" }, { status: 500 });
  }
}
