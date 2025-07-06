import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.createMany({
    data: [
      {
        title: '7 Day Program',
        description: '7 Day Program',
        price: 1499,
      },
      {
        title: 'Personal Counselling',
        description: 'Personal Counselling',
        price: 99,
      },
    ],
  });
  console.log('Course created:', course);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
