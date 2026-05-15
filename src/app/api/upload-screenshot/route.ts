import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "Файл не загружен" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ ok: false, error: "Допустимые форматы: JPG, PNG, WEBP" }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "Максимальный размер файла: 5 МБ" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "uploads", "screenshots");
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const filepath = join(uploadsDir, filename);

    // Write file
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    return NextResponse.json({
      ok: true,
      filename,
      path: `/uploads/screenshots/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ ok: false, error: "Ошибка загрузки файла" }, { status: 500 });
  }
}
