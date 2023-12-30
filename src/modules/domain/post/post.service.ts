import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AuthUser } from '../../../interfaces';
import { isEmptyString } from '../../../utils';
import { Post } from '../../infra/prisma/prisma';
import { PostRepository } from '../../repository/post.repository';
import {
  CreatePostDto,
  ListPostDto,
  ListPostResponse,
  PostResponse,
  RemovePostsDto,
  RemovePostsResponse,
  UpdatePostDto,
} from './dto';

@Injectable()
export class PostService {
  constructor(private readonly repo: PostRepository) {}

  async list(user: AuthUser, dto: ListPostDto): Promise<ListPostResponse> {
    const where = { owner: user };
    const limit = dto.limit ?? 20;
    const offset = dto.offset ?? 0;
    const order = dto.order ?? 'asc';
    const orderBy = dto.orderBy ?? 'createdAt';
    const [posts, totalCount] = await Promise.all([
      this.repo.list({ limit, offset, order, orderBy, where }),
      this.repo.count(where),
    ]);

    return {
      pagination: {
        page: Math.floor(offset / limit) + 1,
        perPage: limit,
      },
      posts: posts.map(this.convert),
      totalCount,
    };
  }

  #findByIdOrThrow = async (id: string, owner: AuthUser) => {
    const found = await this.repo.findById(id, owner);
    if (!found) {
      throw new NotFoundException('Post not found');
    }

    return found;
  };

  async get(user: AuthUser, id: string): Promise<PostResponse> {
    const found = await this.#findByIdOrThrow(id, user);

    return this.convert(found);
  }

  async create(user: AuthUser, dto: CreatePostDto): Promise<PostResponse> {
    if (dto.title.length === 0) {
      throw new BadRequestException('title is empty');
    }
    if (dto.content.length === 0) {
      throw new BadRequestException('content is empty');
    }

    const created = await this.repo.create(dto, user);

    return this.convert(created);
  }

  async update(
    user: AuthUser,
    id: string,
    dto: UpdatePostDto,
  ): Promise<PostResponse> {
    if (isEmptyString(dto.title)) {
      throw new BadRequestException('title is empty');
    }
    if (isEmptyString(dto.content)) {
      throw new BadRequestException('content is empty');
    }

    const found = await this.#findByIdOrThrow(id, user);

    const updated = await this.repo.update(found, dto);

    return this.convert(updated);
  }

  async removeMany(
    user: AuthUser,
    dto: RemovePostsDto,
  ): Promise<RemovePostsResponse> {
    const { ids } = dto;
    const found = await this.repo.findByIds(ids, user);
    if (found.length !== ids.length) {
      throw new NotFoundException('Post not found');
    }

    await this.repo.removeMany(found);

    return { success: true };
  }

  convert(post: Post): PostResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { authorId, removedAt, ...rest } = post;

    return {
      ...rest,
      removed: !!removedAt,
    };
  }
}
