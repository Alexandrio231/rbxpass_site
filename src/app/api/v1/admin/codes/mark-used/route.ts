import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromHeadersOrCookies, verifyAdminToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1),
});

export async function POST(request: Request) {
  const auth = getTokenFromHeadersOrCookies(request.headers);
  if (!verifyAdminToken(auth).ok) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await request.json();
    const { code } = schema.parse(body);
    const normalized = code.trim().toUpperCase();

    const existing = await prisma.legacyCode.findUnique({
      where: { code: normalized },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, error: "Код не найден" }, { status: 404 });
    }

    if (existing.status === "used") {
      return NextResponse.json({ ok: false, error: "Код уже использован" }, { status: 400 });
    }

    await prisma.legacyCode.update({
      where: { id: existing.id },
      data: {
        status: "used",
        used_at: new Date(),
      },
    });

    return NextResponse.json({ ok: true, message: "Код активирован вручную" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Неверные данные" }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
