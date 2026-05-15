const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

function calculateChecksum(prefix, part1, part2) {
  const base = `${prefix}-${part1}-${part2}`;
  const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let sum = 0;
  for (let i = 0; i < base.length; i++) sum += base.charCodeAt(i);
  return CHARSET[sum % CHARSET.length];
}

async function main() {
  const prefix = 'TEST';
  const part1 = '1234';
  const part2 = '5678';
  const checksum = calculateChecksum(prefix, part1, part2);
  const testCode = `${prefix}-${part1}-${part2}-${checksum}`;
  const nominal = 100;

  try {
    const existing = await prisma.legacyCode.findFirst({
      where: { code: testCode },
    });

    if (!existing) {
      await prisma.legacyCode.create({
        data: {
          code: testCode,
          nominal: nominal,
          status: 'active',
          store: 'main',
          product_type: 'roblox',
        },
      });
      console.log(`✅ Тестовый код добавлен: ${testCode}`);
    } else {
      console.log(`ℹ️  Код ${testCode} уже существует (статус: ${existing.status})`);
    }

    console.log(`\n📝 Код для тестирования: ${testCode}`);
    console.log(`   Номинал: ${nominal} Robux`);
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
