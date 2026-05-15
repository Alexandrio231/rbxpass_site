import { NextResponse } from "next/server";

// Yandex Market integration - temporarily disabled
export async function POST() {
  return NextResponse.json({ ok: false, error: "Yandex Market integration disabled" }, { status: 503 });
}
