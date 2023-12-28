import { PrismaClient } from '@prisma/client';

export const cleanup = async (prisma: PrismaClient) => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
};
