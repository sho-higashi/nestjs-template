import { INestApplication } from '@nestjs/common';

import { UpdateMeDto } from '../../src/modules/application/user/dto';
import { User } from '../../src/modules/application/user/response';
import { PrismaService } from '../../src/modules/infrastructure/prisma/prisma.service';
import {
  bootstrap,
  cleanup,
  createRestRequest,
  NestApp,
  RestRequest,
  shutdown,
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
    await shutdown(app);
  });

  describe('/users/me (GET)', () => {
    it('OK: valid user', async () => {
      const res = await request<undefined, User>(
        '/users/me',
        'get',
        undefined,
        users.user1.token,
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: users.user1.id, name: 'user1' });
    });
    it('NG: removed user', async () => {
      const res = await request<undefined, User>(
        '/users/me',
        'get',
        undefined,
        users.removedUser.token,
      );

      expect(res.status).toBe(403);
      expect(res.body).toEqual({
        message: 'Forbidden resource',
        method: 'GET',
        path: '/users/me',
        statusCode: 403,
        timestamp: expect.any(String),
      });
    });
  });

  describe('/users/me (PATCH)', () => {
    it('OK', async () => {
      const res = await request<UpdateMeDto, User>(
        '/users/me',
        'patch',
        { name: 'new name' },
        users.user1.token,
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: users.user1.id,
        name: 'new name',
      });
    });

    it('NG: invalid user', async () => {
      const res = await request<UpdateMeDto, User>(
        '/users/me',
        'patch',
        { name: 'new name' },
        'invalid token',
      );

      expect(res.status).toBe(403);
      expect(res.body).toEqual({
        message: 'Forbidden resource',
        method: 'PATCH',
        path: '/users/me',
        statusCode: 403,
        timestamp: expect.any(String),
      });
    });
  });
});
