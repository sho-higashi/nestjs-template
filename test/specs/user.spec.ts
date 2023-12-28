import { INestApplication } from '@nestjs/common';
import { UpdateMeDto } from 'src/modules/domain/user/dto/update-user.dto';

import { UserResponse } from '../../src/modules/domain/user/dto/user.dto';
import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import {
  bootstrap,
  cleanup,
  createRestRequest,
  NestApp,
  RestRequest,
} from '../utils';

describe('UserController', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let users: NestApp['users'];

  let request: RestRequest;

  beforeAll(async () => {
    const nestApp = await bootstrap();
    app = nestApp.app;
    prisma = nestApp.prisma;
    users = nestApp.users;
    request = createRestRequest(app);
  });

  afterEach(async () => {
    await cleanup(prisma, { keepUsers: true });
  });

  afterAll(async () => {
    await cleanup(prisma, { keepUsers: false });
  });

  it('/users/me (GET)', async () => {
    const res = await request<undefined, UserResponse>(
      '/users/me',
      'get',
      undefined,
      users.user1.token,
    );

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: users.user1.id,
      }),
    );
  });

  it('/users/me (PATCH)', async () => {
    const res = await request<UpdateMeDto, UserResponse>(
      '/users/me',
      'patch',
      { name: 'new name' },
      users.user1.token,
    );

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: users.user1.id,
        name: 'new name',
      }),
    );
  });
});
