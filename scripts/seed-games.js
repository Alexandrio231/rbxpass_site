const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  },
});

const games = [
  {
    name: 'Roblox',
    slug: 'roblox',
    category: 'robux',
    requires_gamepass: true,
    description: 'Robux для Roblox',
  },
  {
    name: 'Fortnite',
    slug: 'fortnite',
    category: 'fortnite',
    requires_gamepass: false,
    description: 'V-Bucks для Fortnite',
  },
  {
    name: 'PlayStation Plus',
    slug: 'ps-plus',
    category: 'ps_plus',
    requires_gamepass: false,
    description: 'Коды активации PlayStation Plus',
  },
  {
    name: 'Xbox Game Pass',
    slug: 'xbox-gamepass',
    category: 'xbox',
    requires_gamepass: false,
    description: 'Коды активации Xbox Game Pass',
  },
  {
    name: 'Steam',
    slug: 'steam',
    category: 'steam',
    requires_gamepass: false,
    description: 'Пополнение кошелька Steam',
  },
];

async function main() {
  console.log('🌱 Заполнение базы данных играми...\n');

  for (const gameData of games) {
    const existing = await prisma.game.findUnique({
      where: { slug: gameData.slug },
    });

    if (existing) {
      console.log(`ℹ️  Игра "${gameData.name}" уже существует`);
    } else {
      const game = await prisma.game.create({
        data: gameData,
      });
      console.log(`✅ Создана игра: ${game.name} (${game.slug})`);
    }
  }

  // Создаем тестовые коды для Roblox
  const roblox = await prisma.game.findUnique({ where: { slug: 'roblox' } });
  if (roblox) {
    const testCodes = [
      { code: 'RBX100-TEST-CODE', nominal: 100 },
      { code: 'TEST-1234-5678-8', nominal: 100 },
    ];

    for (const codeData of testCodes) {
      const existing = await prisma.code.findUnique({
        where: { code: codeData.code },
      });

      if (!existing) {
        await prisma.code.create({
          data: {
            ...codeData,
            game_id: roblox.id,
            status: 'active',
          },
        });
        console.log(`✅ Создан тестовый код: ${codeData.code}`);
      }
    }
  }

  console.log('\n✨ Готово!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());



