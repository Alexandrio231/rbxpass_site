export type ActivationGame = "roblox" | "fortnite" | "pubg" | "other";

export function sanitizePlainText(input: string): string {
  return (input || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>`"'\\]/g, "")
    .trim();
}

export function maskUsername(name: string): string {
  const clean = sanitizePlainText(name);
  if (!clean) return "Игрок";

  if (clean.length <= 3) return `${clean[0] ?? "U"}...`;
  if (clean.length <= 6) return `${clean.slice(0, 2)}...${clean.slice(-1)}`;
  if (clean.length <= 9) return `${clean.slice(0, 3)}...${clean.slice(-1)}`;
  return `${clean.slice(0, 4)}...${clean.slice(-2)}`;
}

export function getCurrencyByGame(game: ActivationGame): string {
  if (game === "roblox") return "R$";
  if (game === "fortnite") return "V-Bucks";
  if (game === "pubg") return "UC";
  return "";
}

export function formatAmountLabel(amount: number, game: ActivationGame): string {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
  if (safeAmount <= 0) return "Номинал скрыт";
  const unit = getCurrencyByGame(game);
  return unit ? `${safeAmount} ${unit}` : `${safeAmount}`;
}

export function formatTimeAgo(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  const diffMs = Date.now() - date.getTime();
  const sec = Math.max(1, Math.floor(diffMs / 1000));

  if (sec < 60) return "только что";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин назад`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs} ч назад`;
  const days = Math.floor(hrs / 24);
  return `${days} дн назад`;
}
