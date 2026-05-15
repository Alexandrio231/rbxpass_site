import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const shipmentSchema = z.object({
  orderId: z.string(),
  shipmentId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      codes: z.array(z.string()).optional(), // Коды для отправки покупателю
    })
  ),
});

/**
 * POST /api/yandex-market/shipments
 * Отправка кодов покупателю (финальная активация)
 * 
 * После подтверждения оплаты отправляем коды покупателю
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = shipmentSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Неверный формат запроса" },
        { status: 400 }
      );
    }

    const { orderId, shipmentId, items } = parsed.data;

    // Находим заказы по orderId
    const orders = await prisma.order.findMany({
      where: {
        user_id: `yandex_market_${orderId}`,
        status: "queued",
      },
      include: {
        game: true,
      },
    });

    if (orders.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Заказы не найдены" },
        { status: 404 }
      );
    }

    // Активируем коды (помечаем как использованные)
    const activatedCodes = [];

    for (const order of orders) {
      // Обновляем статус кода на "used"
      await prisma.code.update({
        where: { code: order.code },
        data: {
          status: "used",
          used_at: new Date(),
        },
      });

      // Обновляем статус заказа
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "done",
        },
      });

      activatedCodes.push({
        code: order.code,
        game: order.game?.name || "Unknown",
        nominal: order.code, // Можно добавить поле nominal в Order
      });
    }

    return NextResponse.json({
      ok: true,
      shipmentId,
      orderId,
      codes: activatedCodes,
      message: "Коды успешно активированы и отправлены покупателю",
    });
  } catch (error) {
    console.error("Yandex Market shipment error:", error);
    return NextResponse.json(
      { ok: false, error: "Ошибка отправки кодов" },
      { status: 500 }
    );
  }
}



