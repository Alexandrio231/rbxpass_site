import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const short = (searchParams.get("code") ?? "").toUpperCase();
  const nickname = (searchParams.get("nickname") ?? "").trim();
  const recent = searchParams.get("recent");

  // Get recent completed orders for public ticker
  if (recent === "true") {
    const orders = await prisma.order.findMany({
      where: { status: "done" },
      orderBy: { created_at: "desc" },
      take: 12,
    });
    return NextResponse.json({
      ok: true,
      orders: orders.map(o => ({
        nickname: o.nickname.length > 6 ? o.nickname.slice(0, 4) + "..." + o.nickname.slice(-2) : o.nickname,
        game: o.product_type === "fortnite" ? "Fortnite" : o.product_type === "pubg" ? "PUBG" : "Roblox",
        nominal: 0, // nominal is on the code, not the order
      })),
    });
  }

  // Search by nickname
  if (nickname) {
    const orders = await prisma.order.findMany({
      where: { nickname: { contains: nickname } },
      orderBy: { created_at: "desc" },
      take: 10,
    });
    if (orders.length === 0) {
      return NextResponse.json({ ok: false, error: "Заказы не найдены для этого ника" }, { status: 404 });
    }
    return NextResponse.json({
      ok: true,
      orders: orders.map(o => ({
        short_code: o.short_code,
        status: o.status,
        nickname: o.nickname,
        created_at: o.created_at,
      })),
    });
  }

  // Search by short code
  if (!short) {
    return NextResponse.json({ ok: false, error: "code required" }, { status: 400 });
  }
  const order = await prisma.order.findFirst({ where: { short_code: short } });
  if (!order) {
    return NextResponse.json({ ok: false, error: "Заказ не найден" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, order: { short_code: order.short_code, status: order.status, created_at: order.created_at } });
}


