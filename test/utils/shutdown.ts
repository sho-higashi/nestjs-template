import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import { NestApp } from './bootstrap';
import { cleanup } from './cleanup';

export const shutdown = async (app: NestApp['app']) => {
  const prisma = app.get(PrismaService);
  await cleanup(prisma, { keepUsers: false });

  await app.close();
};
