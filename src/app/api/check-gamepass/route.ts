import { NextResponse } from "next/server";

// Check a specific GamePass by its ID using Roblox API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gamepassId = searchParams.get("id");

  if (!gamepassId) {
    return NextResponse.json({ ok: false, error: "GamePass ID required" }, { status: 400 });
  }

  try {
    // Try to get GamePass info from Roblox API
    const res = await fetch(
      `https://economy.roblox.com/v1/game-passes/${encodeURIComponent(gamepassId)}/game-pass-product-info`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({
          ok: false,
          error: "GamePass не найден. Возможно, нужно пройти верификацию плейса или GamePass не существует.",
          code: "NOT_FOUND",
        });
      }
      return NextResponse.json({
        ok: false,
        error: "Не удалось проверить GamePass. Попробуйте позже.",
        code: "API_ERROR",
      });
    }

    const data = await res.json();

    return NextResponse.json({
      ok: true,
      gamepass: {
        id: data.TargetId || data.GamePassId || gamepassId,
        name: data.Name || "Unknown",
        price: data.PriceInRobux ?? null,
        isForSale: data.IsForSale ?? false,
        description: data.Description || "",
      },
    });
  } catch (error) {
    console.error("Check GamePass error:", error);
    return NextResponse.json({
      ok: false,
      error: "Ошибка при проверке GamePass",
      code: "NETWORK_ERROR",
    });
  }
}
