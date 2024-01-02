import { INestApplication } from '@nestjs/common';

import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import {
  bootstrap,
  cleanup,
  createRestRequest,
  RestRequest,
  shutdown,
} from '../utils';

describe('HealthCheckController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let request: RestRequest;

  beforeAll(async () => {
    const nestApp = await bootstrap();
    app = nestApp.app;
    prisma = nestApp.prisma;
    request = createRestRequest(app);
  });

  afterEach(async () => {
    await cleanup(prisma, { keepUsers: true });
  });

  afterAll(async () => {
    await shutdown(app);
  });

  it('.well-known/health (GET)', async () => {
    const res = await request('/.well-known/health', 'get');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      details: { prisma: { status: 'up' } },
      error: {},
      info: { prisma: { status: 'up' } },
      status: 'ok',
    });
  });
});
