import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const user1Id = '0cabc5ec-d7ae-42bb-9efa-8dd6cd8ab9a6';
const user2Id = '8fe2957f-a0dd-4dfd-bad2-1ea22f2a79fb';
const user3Id = '8475db65-7f93-41ec-aaf4-38d09031f943';

const userData: Prisma.UserCreateInput[] = [
  {
    id: user1Id,
    name: 'Alice',
  },
  {
    id: user2Id,
    name: 'bob',
  },
  {
    id: user3Id,
    name: 'carol',
    removedAt: new Date(),
  },
];

const postData: Prisma.PostCreateInput[] = [
  {
    author: { connect: { id: user1Id } },
    content: 'Alice post 1 content',
    title: 'Alice post 1',
  },
  {
    author: { connect: { id: user1Id } },
    content: 'Alice post 2 content',
    title: 'Alice post 2',
  },
  {
    author: { connect: { id: user1Id } },
    content: 'Alice post 3 content',
    removedAt: new Date(),
    title: 'Alice post 3',
  },
  {
    author: { connect: { id: user2Id } },
    content: 'Bob post 1 content',
    title: 'Bob post 1',
  },
  {
    author: { connect: { id: user3Id } },
    content: 'Carol post 1 content',
    title: 'Carol post 1',
  },
];

async function main() {
  prisma.$transaction(async (cx) => {
    await cx.user.createMany({ data: userData });
    await Promise.all(postData.map((datum) => cx.post.create({ data: datum })));
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
