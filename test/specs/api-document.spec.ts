import { INestApplication } from '@nestjs/common';

import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import {
  bootstrap,
  cleanup,
  createRestRequest,
  RestRequest,
  shutdown,
} from '../utils';

describe('ApiDocumentController', () => {
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

  it('/api-document (GET)', async () => {
    const res = await request('/api-document/api', 'get');

    expect(res.status).toBe(200);
    expect(res.text).toEqual(expect.stringContaining('nestjs template'));
  });
});
