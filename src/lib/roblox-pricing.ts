const ROBLOX_NOMINALS_RAW = [
  200, 201, 250, 300, 301, 350, 400, 401, 450, 500,
  501, 550, 600, 601, 650, 700, 701, 750, 800,
  801, 850, 900, 901, 950, 1000, 1001, 1200, 1201,
  1250, 1300, 1301, 1400, 1401, 1500, 1501, 1800,
  1801, 2000, 2001, 2500, 2501, 3000, 3001, 3500,
  3501, 4000, 4001, 4500, 4501, 5000, 5001, 6000,
  6001, 7000, 7001, 8000, 8001, 9000, 9001, 10000,
  10001,
] as const;

export const ALLOWED_ROBLOX_NOMINALS: number[] = [...ROBLOX_NOMINALS_RAW].sort((a, b) => a - b);

// Формула Roblox GamePass: сервисная цена с учетом комиссии платформы.
export const ROBLOX_GAMEPASS_PRICE_MAP: Record<number, number> = Object.fromEntries(
  ALLOWED_ROBLOX_NOMINALS.map((nominal) => [nominal, Math.round(nominal / 0.7)]),
);

export function getRequiredGamepassPrice(nominal: number): number | null {
  return ROBLOX_GAMEPASS_PRICE_MAP[nominal] ?? null;
}

export function isAllowedRobloxNominal(nominal: number): boolean {
  return ALLOWED_ROBLOX_NOMINALS.includes(nominal);
}

// Fortnite V-Bucks номиналы для генерации и загрузки кодов
export const ALLOWED_FORTNITE_NOMINALS = [1000, 2800, 5000] as const;

export function isAllowedFortniteNominal(nominal: number): boolean {
  return (ALLOWED_FORTNITE_NOMINALS as readonly number[]).includes(nominal);
}
