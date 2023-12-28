import { INestApplication } from '@nestjs/common';

import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import { bootstrap, cleanup, createRestRequest, RestRequest } from '../utils';

describe('PostController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let requestHealthCheck: RestRequest;

  beforeAll(async () => {
    const nestApp = await bootstrap();
    app = nestApp.app;
    prisma = nestApp.prisma;
    requestHealthCheck = createRestRequest(app);
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
