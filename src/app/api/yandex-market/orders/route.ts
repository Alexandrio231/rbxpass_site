import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Схема для валидации запроса от Яндекс Маркета
const orderSchema = z.object({
  orderId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      offerId: z.string(), // SKU товара
      count: z.number().int().positive(),
    })
  ),
  buyer: z.object({
    lastName: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }).optional(),
});

/**
 * POST /api/yandex-market/orders
 * Получение заказов от Яндекс Маркета (FBY API)
 * 
 * Яндекс Маркет отправляет заказы через webhook или мы получаем их через API
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = orderSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Неверный формат заказа" },
        { status: 400 }
      );
    }

    const { orderId, items, buyer } = parsed.data;

    // Обрабатываем каждый товар в заказе
    const processedItems = [];

    for (const item of items) {
      // offerId должен быть в формате: game-slug-nominal (например: roblox-100)
      const [gameSlug, nominalStr] = item.offerId.split("-");
      const nominal = parseInt(nominalStr, 10);

      if (!gameSlug || !nominal) {
        processedItems.push({
          id: item.id,
          status: "REJECTED",
          reason: "Неверный формат SKU товара",
        });
        continue;
      }

      // Находим игру по slug
      const game = await prisma.game.findUnique({
        where: { slug: gameSlug },
      });

      if (!game || !game.is_active) {
        processedItems.push({
          id: item.id,
          status: "REJECTED",
          reason: "Игра не найдена или неактивна",
        });
        continue;
      }

      // Ищем доступные коды для этой игры и номинала
      const availableCodes = await prisma.code.findMany({
        where: {
          game_id: game.id,
          nominal: nominal,
          status: "active",
        },
        take: item.count,
      });

      if (availableCodes.length < item.count) {
        processedItems.push({
          id: item.id,
          status: "REJECTED",
          reason: `Недостаточно кодов. Доступно: ${availableCodes.length}, требуется: ${item.count}`,
        });
        continue;
      }

      // Резервируем коды
      const reservedCodes = [];
      for (const code of availableCodes) {
        // Обновляем статус кода на "reserved"
        await prisma.code.update({
          where: { id: code.id },
          data: {
            status: "reserved",
            reserved_at: new Date(),
            reserved_until: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 часа
          },
        });

        // Создаем заказ
        const order = await prisma.order.create({
          data: {
            short_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            code: code.code,
            nickname: buyer?.firstName || "Yandex Market",
            telegram: buyer?.phone || buyer?.email || null,
            game_id: game.id,
            user_id: `yandex_market_${orderId}`,
            status: "queued",
          },
        });

        reservedCodes.push({
          code: code.code,
          nominal: code.nominal,
          orderId: order.short_code,
        });
      }

      processedItems.push({
        id: item.id,
        status: "ACCEPTED",
        codes: reservedCodes,
      });
    }

    // Возвращаем ответ в формате Яндекс Маркета
    return NextResponse.json({
      orderId,
      status: "PROCESSED",
      items: processedItems,
    });
  } catch (error) {
    console.error("Yandex Market order processing error:", error);
    return NextResponse.json(
      { ok: false, error: "Ошибка обработки заказа" },
      { status: 500 }
    );
  }
}



