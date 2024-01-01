import { Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { AppModule } from '../../src/app.module';
import { FibonacciModule } from '../../src/modules/domain/fibonacci/fibonacci.module';
import { FibonacciService } from '../../src/modules/domain/fibonacci/fibonacci.service';
import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import { cleanup } from './cleanup';
import { prepareUsers } from './prepare';

@Module({})
class MockFibonacciModule {}

export const bootstrap = async () => {
  const fibonacciService = mockDeep<FibonacciService>({
    fibonacci: jest.fn().mockResolvedValue(0),
  });
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideModule(FibonacciModule)
    .useModule(MockFibonacciModule)
    .overrideProvider(FibonacciService)
    .useClass(fibonacciService)
    .compile();

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
