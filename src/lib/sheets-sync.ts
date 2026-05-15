import { getRequiredGamepassPrice } from "@/lib/roblox-pricing";

export type OrderForSheets = {
  id: number;
  shortCode: string;
  store: string;
  status: string;
  createdAtIso: string;
  gamepassUrl: string;
  gamepassId: string;
  codeNominal: number | null;
  nickname: string;
  telegram: string | null;
};

const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim() || "";
const SHEETS_SYNC_SECRET = process.env.GOOGLE_SHEETS_SYNC_SECRET?.trim() || "";

function isSheetsSyncConfigured(): boolean {
  return Boolean(SHEETS_WEBHOOK_URL && SHEETS_SYNC_SECRET);
}

function mapOrderStatusToSupplierStatus(status: string): string {
  const lower = (status || "").toLowerCase();
  if (lower === "queued") return "queued";
  if (lower === "processing") return "done"; // supplier uses "done" as in-progress
  if (lower === "error") return "error";
  if (lower === "done") return "completed";
  return "queued";
}

export function mapSupplierStatusToOrderStatus(status: string): "queued" | "processing" | "done" | "error" {
  const lower = (status || "").toLowerCase().trim();
  if (!lower) return "queued";
  if (["queued", "queue", "new", "pending"].includes(lower)) return "queued";
  if (["done", "processing", "in_progress", "in progress", "work"].includes(lower)) return "processing";
  if (["completed", "complete", "finished", "success"].includes(lower)) return "done";
  if (["error", "failed", "fail", "cancelled", "canceled"].includes(lower)) return "error";
  return "queued";
}

function resolveGamepassUrl(gamepassUrl: string, gamepassId: string): string {
  if (gamepassUrl && gamepassUrl !== "-") return gamepassUrl;
  if (gamepassId && gamepassId !== "-") return `https://www.roblox.com/game-pass/${gamepassId}`;
  return "";
}

export async function syncOrderToGoogleSheets(order: OrderForSheets): Promise<void> {
  if (!isSheetsSyncConfigured()) return;

  const gamepassUrl = resolveGamepassUrl(order.gamepassUrl, order.gamepassId);
  const robuxWithCommission =
    typeof order.codeNominal === "number" ? getRequiredGamepassPrice(order.codeNominal) ?? order.codeNominal : null;

  const payload = {
    secret: SHEETS_SYNC_SECRET,
    action: "upsert_order",
    order: {
      id: order.id,
      shortCode: order.shortCode,
      store: order.store,
      status: mapOrderStatusToSupplierStatus(order.status),
      createdAt: order.createdAtIso,
      gamepassUrl,
      nominal: order.codeNominal,
      robuxWithCommission,
      nickname: order.nickname,
      telegram: order.telegram,
    },
  };

  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Sheets sync (upsert_order) failed:", res.status, body);
    }
  } catch (error) {
    console.error("Sheets sync (upsert_order) error:", error);
  }
}

export async function syncOrderStatusToGoogleSheets(input: {
  orderId: number;
  store: string;
  status: string;
}): Promise<void> {
  if (!isSheetsSyncConfigured()) return;

  const payload = {
    secret: SHEETS_SYNC_SECRET,
    action: "update_status",
    order: {
      id: input.orderId,
      store: input.store,
      status: mapOrderStatusToSupplierStatus(input.status),
    },
  };

  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Sheets sync (update_status) failed:", res.status, body);
    }
  } catch (error) {
    console.error("Sheets sync (update_status) error:", error);
  }
}
