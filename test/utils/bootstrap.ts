import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/modules/infrastructure/prisma/prisma.service';
import { cleanup } from './cleanup';
import { prepareUsers } from './prepare';

export const bootstrap = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const prisma = app.get(PrismaService);

  await cleanup(prisma, { keepUsers: false });
  const users = await prepareUsers(prisma);

  await app.init();

  return {
    app,
    prisma,
    users,
  };
};

export type NestApp = Awaited<ReturnType<typeof bootstrap>>;
