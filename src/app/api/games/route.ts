import { NextResponse } from "next/server";

// Static games list (Game model removed from schema, multi-game support planned for future)
export async function GET() {
  const games = [
    { id: 1, name: "Roblox", slug: "roblox", category: "robux", description: "Robux через GamePass", requires_gamepass: true },
  ];

  return NextResponse.json({ ok: true, games });
}
