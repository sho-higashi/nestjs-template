import { INestApplication } from '@nestjs/common';

import {
  CreatePostDto,
  ListPostDto,
  ListPostResponse,
  PostResponse,
  RemovePostsDto,
  RemovePostsResponse,
  UpdatePostDto,
} from '../../src/modules/domain/post/dto';
import { PrismaService } from '../../src/modules/infra/prisma/prisma.service';
import {
  bootstrap,
  cleanup,
  createRestRequest,
  NestApp,
  RestRequest,
} from '../utils';

describe('PostController', () => {
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

  it('/posts create -> list -> update -> get -> delete', async () => {
    const resCreate = await request<CreatePostDto, PostResponse>(
      '/posts',
      'post',
      { content: 'content', title: 'title' },
      users.user1.token,
    );

    expect(resCreate.status).toBe(200);
    expect(resCreate.body).toEqual(
      expect.objectContaining({
        authorId: users.user1.id,
        content: 'content',
        title: 'title',
      }),
    );

    const { id } = resCreate.body;

    const resList = await request<ListPostDto, ListPostResponse>(
      '/posts',
      'get',
      {},
      users.user1.token,
    );

    expect(resList.status).toBe(200);
    expect(resList.body).toEqual({
      pagination: {
        page: 1,
        perPage: 20,
      },
      posts: [
        expect.objectContaining({
          authorId: users.user1.id,
          content: 'content',
          id,
          title: 'title',
        }),
      ],
      totalCount: 1,
    });

    const newContent = 'new content';
    const resUpdate = await request<UpdatePostDto, PostResponse>(
      '/posts/' + id,
      'put',
      { content: newContent },
      users.user1.token,
    );

    expect(resUpdate.status).toBe(200);
    expect(resUpdate.body).toEqual(
      expect.objectContaining({
        authorId: users.user1.id,
        content: newContent,
        title: 'title',
      }),
    );

    const resGet = await request<undefined, PostResponse>(
      '/posts/' + id,
      'get',
      undefined,
      users.user1.token,
    );

    expect(resGet.status).toBe(200);
    expect(resGet.body).toEqual(
      expect.objectContaining({
        authorId: users.user1.id,
        content: newContent,
        id,
        title: 'title',
      }),
    );

    const resDelete = await request<RemovePostsDto, RemovePostsResponse>(
      '/posts',
      'delete',
      { ids: [id] },
      users.user1.token,
    );

    expect(resDelete.status).toBe(200);
    expect(resDelete.body).toEqual({
      success: true,
    });
  });
});
