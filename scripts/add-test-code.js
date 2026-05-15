const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  },
});

// Функция для вычисления контрольной суммы (как в API)
function calculateChecksum(prefix, part1, part2) {
  const base = `${prefix}-${part1}-${part2}`;
  const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let sum = 0;
  for (let i = 0; i < base.length; i++) sum += base.charCodeAt(i);
  return CHARSET[sum % CHARSET.length];
}

async function main() {
  // Тестовый код в старом формате RBX100-XXXX-XXXX (проще для теста)
  const testCodeOld = 'RBX100-TEST-CODE';
  
  // Тестовый код в новом формате с правильной контрольной суммой
  const prefix = 'TEST';
  const part1 = '1234';
  const part2 = '5678';
  const checksum = calculateChecksum(prefix, part1, part2);
  const testCodeNew = `${prefix}-${part1}-${part2}-${checksum}`;
  
  const nominal = 100; // Номинал в Robux

  try {
    // Добавляем старый формат
    const existingOld = await prisma.code.findUnique({
      where: { code: testCodeOld },
    });

    if (!existingOld) {
      await prisma.code.create({
        data: {
          code: testCodeOld,
          nominal: nominal,
          status: 'active',
        },
      });
      console.log(`✅ Тестовый код (старый формат) добавлен: ${testCodeOld}`);
    } else {
      console.log(`ℹ️  Код ${testCodeOld} уже существует`);
    }

    // Добавляем новый формат
    const existingNew = await prisma.code.findUnique({
      where: { code: testCodeNew },
    });

    if (!existingNew) {
      await prisma.code.create({
        data: {
          code: testCodeNew,
          nominal: nominal,
          status: 'active',
        },
      });
      console.log(`✅ Тестовый код (новый формат) добавлен: ${testCodeNew}`);
    } else {
      console.log(`ℹ️  Код ${testCodeNew} уже существует`);
    }

    console.log(`\n📝 Используйте эти коды для тестирования активации:`);
    console.log(`   1. Старый формат: ${testCodeOld}`);
    console.log(`   2. Новый формат: ${testCodeNew}`);
    console.log(`   Номинал: ${nominal} Robux`);
  } catch (error) {
    console.error('❌ Ошибка при добавлении кода:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
