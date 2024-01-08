/* eslint-disable sonarjs/no-duplicate-string */
import { INestApplication } from '@nestjs/common';

import {
  CreatePostDto,
  ListPostDto,
  RemovePostsDto,
  UpdatePostDto,
} from '../../src/modules/application/post/dto';
import {
  ListPostResponse,
  Post,
  RemovePostsResponse,
} from '../../src/modules/application/post/response';
import { PrismaService } from '../../src/modules/infrastructure/prisma/prisma.service';
import {
  bootstrap,
  cleanup,
  createRestRequest,
  NestApp,
  RestRequest,
  shutdown,
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

  const prepare = async (prisma: PrismaService) => {
    const [post1, post2, post1Removed] = await Promise.all([
      prisma.post.create({
        data: {
          authorId: users.user1.id,
          content: 'content for user1',
          title: 'title for user1',
        },
      }),
      prisma.post.create({
        data: {
          authorId: users.user2.id,
          content: 'content for user2',
          title: 'title for user2',
        },
      }),
      prisma.post.create({
        data: {
          authorId: users.user1.id,
          content: 'content for user1',
          removedAt: new Date(),
          title: 'title for user1',
        },
      }),
    ]);

    return { post: { post1, post1Removed, post2 } };
  };

  // beforeEach(async () => {
  //   await prepare(prisma);
  // });

  afterEach(async () => {
    await cleanup(prisma, { keepUsers: true });
  });

  afterAll(async () => {
    await shutdown(app);
  });

  it("OK: list, get only author's posts", async () => {
    const prepared = await prepare(prisma);

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
          id: prepared.post.post1.id,
        }),
      ],
      totalCount: 1,
    });
  });

  it('NG: create, empty title or empty content', async () => {
    const resCreateEmptyTitle = await request<CreatePostDto, Post>(
      '/posts',
      'post',
      { content: '', title: 'title' },
      users.user1.token,
    );
    expect(resCreateEmptyTitle.status).toBe(400);
    expect(resCreateEmptyTitle.body).toEqual({
      message: 'content is empty',
      method: 'POST',
      path: '/posts',
      statusCode: 400,
      timestamp: expect.any(String),
    });

    const resCreateEmptyContent = await request<CreatePostDto, Post>(
      '/posts',
      'post',
      { content: 'content', title: '' },
      users.user1.token,
    );
    expect(resCreateEmptyContent.status).toBe(400);
    expect(resCreateEmptyContent.body).toEqual({
      message: 'title is empty',
      method: 'POST',
      path: '/posts',
      statusCode: 400,
      timestamp: expect.any(String),
    });
  });
  it("NG: update, not found (invalid id, removed post, other's post)", async () => {
    const prepared = await prepare(prisma);

    /** invalid id */
    const resUpdateInvalidId = await request<UpdatePostDto, Post>(
      '/posts/invalid-update-id',
      'put',
      { content: 'content' },
      users.user1.token,
    );

    expect(resUpdateInvalidId.status).toBe(404);
    expect(resUpdateInvalidId.body).toEqual({
      message: 'Post not found',
      method: 'PUT',
      path: '/posts/invalid-update-id',
      statusCode: 404,
      timestamp: expect.any(String),
    });

    /** removed id */
    const resUpdateRemoved = await request<UpdatePostDto, Post>(
      '/posts/' + prepared.post.post1Removed.id,
      'put',
      { content: 'content' },
      users.user1.token,
    );

    expect(resUpdateRemoved.status).toBe(404);
    expect(resUpdateRemoved.body).toEqual({
      message: 'Post not found',
      method: 'PUT',
      path: '/posts/' + prepared.post.post1Removed.id,
      statusCode: 404,
      timestamp: expect.any(String),
    });

    /** other user's post */
    const resUpdateOthers = await request<UpdatePostDto, Post>(
      '/posts/' + prepared.post.post2.id,
      'put',
      { content: 'content' },
      users.user1.token,
    );

    expect(resUpdateOthers.status).toBe(404);
    expect(resUpdateOthers.body).toEqual({
      message: 'Post not found',
      method: 'PUT',
      path: '/posts/' + prepared.post.post2.id,
      statusCode: 404,
      timestamp: expect.any(String),
    });
  });
  it('NG: update, empty title or empty content', async () => {
    const prepared = await prepare(prisma);

    const resUpdateEmptyContent = await request<UpdatePostDto, Post>(
      '/posts/' + prepared.post.post1.id,
      'put',
      { content: '' },
      users.user1.token,
    );

    expect(resUpdateEmptyContent.status).toBe(400);
    expect(resUpdateEmptyContent.body).toEqual({
      message: 'content is empty',
      method: 'PUT',
      path: '/posts/' + prepared.post.post1.id,
      statusCode: 400,
      timestamp: expect.any(String),
    });

    const resUpdateEmptyTitle = await request<UpdatePostDto, Post>(
      '/posts/' + prepared.post.post1.id,
      'put',
      { title: '' },
      users.user1.token,
    );

    expect(resUpdateEmptyTitle.status).toBe(400);
    expect(resUpdateEmptyTitle.body).toEqual({
      message: 'title is empty',
      method: 'PUT',
      path: '/posts/' + prepared.post.post1.id,
      statusCode: 400,
      timestamp: expect.any(String),
    });
  });
  it("NG: get, not found (invalid id, removed post, other's post)", async () => {
    const prepared = await prepare(prisma);

    /** invalid id */
    const resGetInvalidId = await request<UpdatePostDto, Post>(
      '/posts/invalid-get-id',
      'get',
      undefined,
      users.user1.token,
    );

    expect(resGetInvalidId.status).toBe(404);
    expect(resGetInvalidId.body).toEqual({
      message: 'Post not found',
      method: 'GET',
      path: '/posts/invalid-get-id',
      statusCode: 404,
      timestamp: expect.any(String),
    });

    /** removed id */
    const resGetRemoved = await request<UpdatePostDto, Post>(
      '/posts/' + prepared.post.post1Removed.id,
      'get',
      undefined,
      users.user1.token,
    );

    expect(resGetRemoved.status).toBe(404);
    expect(resGetRemoved.body).toEqual({
      message: 'Post not found',
      method: 'GET',
      path: '/posts/' + prepared.post.post1Removed.id,
      statusCode: 404,
      timestamp: expect.any(String),
    });

    /** other user's post */
    const resGetOthers = await request<UpdatePostDto, Post>(
      '/posts/' + prepared.post.post2.id,
      'get',
      undefined,
      users.user1.token,
    );

    expect(resGetOthers.status).toBe(404);
    expect(resGetOthers.body).toEqual({
      message: 'Post not found',
      method: 'GET',
      path: '/posts/' + prepared.post.post2.id,
      statusCode: 404,
      timestamp: expect.any(String),
    });
  });

  it("NG: remove, not found (invalid id, already removed, other's post)", async () => {
    const prepared = await prepare(prisma);

    /** invalid id */
    const resUpdateInvalidId = await request<
      RemovePostsDto,
      RemovePostsResponse
    >('/posts', 'delete', { ids: ['invalid-remove-id'] }, users.user1.token);

    expect(resUpdateInvalidId.status).toBe(404);
    expect(resUpdateInvalidId.body).toEqual({
      message: 'Post not found',
      method: 'DELETE',
      path: '/posts',
      statusCode: 404,
      timestamp: expect.any(String),
    });

    /** removed id */
    const resUpdateRemoved = await request<RemovePostsDto, RemovePostsResponse>(
      '/posts/',
      'delete',
      { ids: [prepared.post.post1Removed.id] },
      users.user1.token,
    );

    expect(resUpdateRemoved.status).toBe(404);
    expect(resUpdateRemoved.body).toEqual({
      message: 'Post not found',
      method: 'DELETE',
      path: '/posts/',
      statusCode: 404,
      timestamp: expect.any(String),
    });

    /** other user's post */
    const resUpdateOthers = await request<RemovePostsDto, RemovePostsResponse>(
      '/posts/',
      'delete',
      { ids: [prepared.post.post2.id] },
      users.user1.token,
    );

    expect(resUpdateOthers.status).toBe(404);
    expect(resUpdateOthers.body).toEqual({
      message: 'Post not found',
      method: 'DELETE',
      path: '/posts/',
      statusCode: 404,
      timestamp: expect.any(String),
    });
  });

  it('scenario: create -> delete -> list, get (not found)', async () => {
    const resCreate = await request<CreatePostDto, Post>(
      '/posts',
      'post',
      { content: 'content', title: 'title' },
      users.user1.token,
    );

    expect(resCreate.status).toBe(200);
    expect(resCreate.body).toEqual({
      content: 'content',
      createdAt: expect.any(String),
      id: expect.any(String),
      removed: false,
      title: 'title',
      updatedAt: expect.any(String),
    });

    const { id } = resCreate.body;

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
      posts: [],
      totalCount: 0,
    });

    const resGet = await request<undefined, Post>(
      '/posts/' + id,
      'get',
      undefined,
      users.user1.token,
    );

    expect(resGet.status).toBe(404);
    expect(resGet.body).toEqual({
      message: 'Post not found',
      method: 'GET',
      path: '/posts/' + id,
      statusCode: 404,
      timestamp: expect.any(String),
    });
  });

  it('scenario: create -> update', async () => {
    const resCreate = await request<CreatePostDto, Post>(
      '/posts',
      'post',
      { content: 'content', title: 'title' },
      users.user1.token,
    );

    expect(resCreate.status).toBe(200);
    expect(resCreate.body).toEqual({
      content: 'content',
      createdAt: expect.any(String),
      id: expect.any(String),
      removed: false,
      title: 'title',
      updatedAt: expect.any(String),
    });

    const { id } = resCreate.body;

    const newContent = 'new content';
    const resUpdate = await request<UpdatePostDto, Post>(
      '/posts/' + id,
      'put',
      { content: newContent },
      users.user1.token,
    );

    expect(resUpdate.status).toBe(200);
    expect(resUpdate.body).toEqual({
      content: newContent,
      createdAt: expect.any(String),
      id,
      removed: false,
      title: 'title',
      updatedAt: expect.any(String),
    });
  });
});
