import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "file:./dev.db",
    },
  },
});

async function main() {
  // Тестовый код в формате RBX-XXXX-XXXX-Y
  // Для упрощения используем старый формат RBX100-XXXX-XXXX
  const testCode = "RBX100-TEST-CODE";
  const nominal = 100; // Номинал в Robux

  try {
    // Проверяем, существует ли уже такой код
    const existing = await prisma.code.findUnique({
      where: { code: testCode },
    });

    if (existing) {
      console.log(`✅ Код ${testCode} уже существует в базе данных`);
      console.log(`   Номинал: ${existing.nominal} Robux`);
      console.log(`   Статус: ${existing.status}`);
      return;
    }

    // Создаем тестовый код
    const code = await prisma.code.create({
      data: {
        code: testCode,
        nominal: nominal,
        status: "active",
      },
    });

    console.log(`✅ Тестовый код успешно добавлен!`);
    console.log(`   Код: ${code.code}`);
    console.log(`   Номинал: ${code.nominal} Robux`);
    console.log(`   Статус: ${code.status}`);
    console.log(`\n📝 Используйте этот код для тестирования активации:`);
    console.log(`   ${testCode}`);
  } catch (error) {
    console.error("❌ Ошибка при добавлении кода:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

