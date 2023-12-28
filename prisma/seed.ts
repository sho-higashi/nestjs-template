import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const user1Id = '0cabc5ec-d7ae-42bb-9efa-8dd6cd8ab9a6';
const user2Id = '8fe2957f-a0dd-4dfd-bad2-1ea22f2a79fb';

const userData: Prisma.UserCreateInput[] = [
  {
    id: user1Id,
    name: 'Alice',
  },
  {
    id: user2Id,
    name: 'bob',
  },
];

async function main() {
  prisma.$transaction(async (cx) => {
    await cx.user.createMany({ data: userData });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
