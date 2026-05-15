import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    // SQLite не поддерживает mode: "insensitive", используем обычный contains
    const games = await prisma.game.findMany({
      where: {
        is_active: true,
        ...(category ? { category } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } },
                { slug: { contains: search } },
              ],
            }
          : {}),
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        icon_url: true,
        description: true,
        requires_gamepass: true,
      },
    });

    return NextResponse.json({ ok: true, games });
  } catch (error) {
    console.error("Get games error:", error);
    return NextResponse.json(
      { ok: false, error: "Ошибка получения списка игр" },
      { status: 500 }
    );
  }
}

