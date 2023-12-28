import { PrismaClient } from '@prisma/client';

export const cleanup = async (
  prisma: PrismaClient,
  options: { keepUsers?: boolean } = {},
) => {
  const keepUsers =
    typeof options.keepUsers === 'boolean' ? options.keepUsers : false;
  await prisma.post.deleteMany();

  if (!keepUsers) await prisma.user.deleteMany();
};
