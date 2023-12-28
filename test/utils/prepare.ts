import { PrismaClient } from '@prisma/client';

export const prepareUsers = async (prisma: PrismaClient) => {
  const user1 = await prisma.user.create({ data: { name: 'user1' } });
  const user2 = await prisma.user.create({ data: { name: 'user2' } });
  const removedUser = await prisma.user.create({
    data: { name: 'user3', removedAt: new Date() },
  });

  return {
    removedUser: {
      id: removedUser.id,
      token: removedUser.id,
    },
    user1: {
      id: user1.id,
      token: user1.id,
    },
    user2: {
      id: user2.id,
      token: user2.id,
    },
  };
};
