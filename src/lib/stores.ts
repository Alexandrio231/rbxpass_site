import { ALLOWED_FORTNITE_NOMINALS, ALLOWED_ROBLOX_NOMINALS } from "./roblox-pricing";

export type StoreKey = "main" | "kwr_partner" | "akr_partner";

export type StoreConfig = {
  key: StoreKey;
  name: string;
  description?: string;
  robloxNominals: readonly number[];
  fortniteNominals: readonly number[];
  prefixes: {
    roblox: string[];
    fortnite?: string[];
    pubg?: string[];
    other?: string[];
  };
};

export const STORE_CONFIGS: Record<StoreKey, StoreConfig> = {
  main: {
    key: "main",
    name: "RBX (Александр)",
    description: "Основной магазин Александр",
    robloxNominals: ALLOWED_ROBLOX_NOMINALS,
    fortniteNominals: ALLOWED_FORTNITE_NOMINALS,
    prefixes: {
      roblox: ["RBX", "RBX100"],
      fortnite: ["FNT"],
      pubg: ["PUBG"],
      other: ["CODE"],
    },
  },
  kwr_partner: {
    key: "kwr_partner",
    name: "KWR (Кромм)",
    description: "Партнёрский магазин Кромм",
    robloxNominals: ALLOWED_ROBLOX_NOMINALS,
    fortniteNominals: ALLOWED_FORTNITE_NOMINALS,
    prefixes: {
      roblox: ["KWR"],
      fortnite: ["KWR"],
      pubg: ["KWR"],
      other: ["KWR"],
    },
  },
  akr_partner: {
    key: "akr_partner",
    name: "AKR (Кочетов)",
    description: "Партнёрский магазин Кочетов",
    robloxNominals: ALLOWED_ROBLOX_NOMINALS,
    fortniteNominals: ALLOWED_FORTNITE_NOMINALS,
    prefixes: {
      roblox: ["AKR"],
      fortnite: ["AKR"],
      pubg: ["AKR"],
      other: ["AKR"],
    },
  },
};

export const DEFAULT_STORE: StoreKey = "main";

export function isValidStoreKey(value: string | null | undefined): value is StoreKey {
  return value === "main" || value === "kwr_partner" || value === "akr_partner";
}

export function detectStoreByCodePrefix(code: string): StoreKey | null {
  const upper = code.toUpperCase();
  let matched: StoreKey | null = null;
  let longest = 0;

  (Object.values(STORE_CONFIGS) as StoreConfig[]).forEach((cfg) => {
    const allPrefixes: string[] = [
      ...(cfg.prefixes.roblox ?? []),
      ...(cfg.prefixes.fortnite ?? []),
      ...(cfg.prefixes.pubg ?? []),
      ...(cfg.prefixes.other ?? []),
    ];
    for (const rawPrefix of allPrefixes) {
      const prefix = rawPrefix.toUpperCase();
      if (!prefix) continue;
      if (upper.startsWith(prefix) && prefix.length > longest) {
        longest = prefix.length;
        matched = cfg.key;
      }
    }
  });

  return matched;
}
