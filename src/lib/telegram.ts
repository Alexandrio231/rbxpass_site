import { promises as fs } from "node:fs";
import path from "node:path";

type NewOrderTelegramPayload = {
  amount: number | string;
  gamepassUrl: string;
  orderId?: number | string;
  customerTelegram?: string;
  activatedCode?: string;
  shortCode?: string;
  screenshotPath?: string | null;
  storeName?: string;
};

type TelegramApiResponse = {
  ok?: boolean;
  description?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramRequestWithRetry(
  url: string,
  init: RequestInit,
  attempts = 3,
): Promise<{ ok: boolean; error?: string }> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, init);
      const body = (await res.json().catch(() => null)) as TelegramApiResponse | null;
      const apiOk = body?.ok === true;

      if (res.ok && apiOk) {
        return { ok: true };
      }

      const reason = body?.description || `HTTP ${res.status}`;
      if (attempt === attempts) {
        return { ok: false, error: reason };
      }
    } catch (error) {
      if (attempt === attempts) {
        return { ok: false, error: error instanceof Error ? error.message : "network_error" };
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
  }

  return { ok: false, error: "unknown_error" };
}

export async function sendNewOrderTelegramNotification(
  payload: NewOrderTelegramPayload
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return;
  }

  const safeAmount = escapeHtml(String(payload.amount));
  const safeUrl = escapeHtml(payload.gamepassUrl || "-");
  const safeOrderId = escapeHtml(payload.orderId ? String(payload.orderId) : "-");
  const safeCustomerTelegram = escapeHtml(payload.customerTelegram || "-");
  const safeCode = escapeHtml(payload.activatedCode || "-");
  const safeShortCode = escapeHtml(payload.shortCode || "-");
  const safeStoreName = escapeHtml(payload.storeName || "Алекс");

  const text = [
    "🔔 <b>Новый заказ</b>",
    "",
    `💰 Номинал: <b>${safeAmount} Robux</b>`,
    `🏬 Магазин: <b>${safeStoreName}</b>`,
    `🔗 GamePass: ${safeUrl}`,
    `📨 Telegram клиента: ${safeCustomerTelegram}`,
    `🆔 ID: ${safeOrderId} (код заказа: <code>${safeShortCode}</code>)`,
    `🔑 Код активирован: <code>${safeCode}</code>`,
  ].join("\n");

  try {
    const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const primarySend = await sendTelegramRequestWithRetry(sendMessageUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    // Fallback на plain-text, если Telegram отклонил HTML-парсинг.
    if (!primarySend.ok) {
      const fallbackText = text.replace(/<[^>]+>/g, "");
      const fallbackSend = await sendTelegramRequestWithRetry(sendMessageUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: fallbackText,
          disable_web_page_preview: true,
        }),
      });

      if (!fallbackSend.ok) {
        console.error("Telegram sendMessage failed:", fallbackSend.error || primarySend.error || "unknown");
      }
    }

    // Отправляем скриншот покупки как файл, если есть локальный путь
    if (payload.screenshotPath) {
      try {
        const normalizedPath = payload.screenshotPath.startsWith("/")
          ? payload.screenshotPath
          : `/${payload.screenshotPath}`;
        const projectRoot = process.cwd();
        const filePath = path.join(projectRoot, "public", normalizedPath.replace(/^\//, ""));

        const buffer = await fs.readFile(filePath);
        const uint8 = new Uint8Array(buffer);
        const blob = new Blob([uint8]);
        const form = new FormData();
        form.append("chat_id", chatId);
        form.append("photo", blob, path.basename(filePath));
        form.append(
          "caption",
          `🧾 Скриншот покупки для заказа #${safeOrderId} (код: ${safeShortCode})`,
        );

        const photoRes = await sendTelegramRequestWithRetry(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: "POST",
          body: form,
        });

        if (!photoRes.ok) {
          console.error("Telegram sendPhoto failed:", photoRes.error || "unknown");
        }
      } catch (err) {
        console.error("Telegram sendPhoto (file) error:", err);
      }
    }
  } catch (error) {
    console.error("Telegram notification error:", error);
  }
}
