const { PrismaClient } = require('../src/generated/prisma');
const p = new PrismaClient();

async function main() {
  const done = await p.order.count({ where: { status: 'done' } });
  const total = await p.order.count();
  console.log('Total orders:', total);
  console.log('Done orders:', done);
  await p.$disconnect();
}
main();
