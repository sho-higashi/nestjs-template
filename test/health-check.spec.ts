import { INestApplication } from '@nestjs/common';

import { bootstrap, cleanup, createRequester, Requester } from './utils';

describe('HealthCheckController', () => {
  let app: INestApplication;

  let requestHealthCheck: Requester;

  beforeAll(async () => {
    const nestApp = await bootstrap();
    app = nestApp.app;
    requestHealthCheck = createRequester(app);
  });

  afterEach(async () => {
    await cleanup();
  });

  it('.well-known/health (GET)', async () => {
    const res = await requestHealthCheck('/.well-known/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      details: { prisma: { status: 'up' } },
      error: {},
      info: { prisma: { status: 'up' } },
      status: 'ok',
    });
  });
});
