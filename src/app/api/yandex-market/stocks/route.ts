import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/yandex-market/stocks
 * Получение остатков товаров для Яндекс Маркета
 * 
 * Возвращает список доступных товаров с остатками
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get("sku"); // Фильтр по конкретному SKU

    // Получаем все активные игры
    const games = await prisma.game.findMany({
      where: { is_active: true },
      include: {
        codes: {
          where: {
            status: "active",
          },
          select: {
            nominal: true,
            status: true,
          },
        },
      },
    });

    // Формируем список товаров с остатками
    const stocks = [];

    for (const game of games) {
      // Группируем коды по номиналам
      const nominals = new Map<number, number>();

      for (const code of game.codes) {
        const count = nominals.get(code.nominal) || 0;
        nominals.set(code.nominal, count + 1);
      }

      // Создаем записи для каждого номинала
      for (const [nominal, count] of nominals.entries()) {
        const offerId = `${game.slug}-${nominal}`;

        // Если указан SKU, фильтруем только его
        if (sku && offerId !== sku) {
          continue;
        }

        stocks.push({
          sku: offerId,
          offerId: offerId,
          name: `${game.name} - ${nominal} ${game.name === 'Roblox' ? 'Robux' : 'единиц'}`,
          category: game.category,
          count: count,
          available: count > 0,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      stocks,
      total: stocks.length,
    });
  } catch (error) {
    console.error("Yandex Market stocks error:", error);
    return NextResponse.json(
      { ok: false, error: "Ошибка получения остатков" },
      { status: 500 }
    );
  }
}



