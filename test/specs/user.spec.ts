import { INestApplication } from '@nestjs/common';

import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import { bootstrap, cleanup, createRequester, Requester } from '../utils';

describe('UserController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let requestHealthCheck: Requester;

  beforeAll(async () => {
    const nestApp = await bootstrap();
    app = nestApp.app;
    prisma = nestApp.prisma;
    requestHealthCheck = createRequester(app);
  });

  afterEach(async () => {
    await cleanup(prisma);
  });

  it('me (GET)', async () => {
    expect(requestHealthCheck).toBeTruthy();
  });

  it('me (PATCH)', async () => {
    expect(requestHealthCheck).toBeTruthy();
  });
});
