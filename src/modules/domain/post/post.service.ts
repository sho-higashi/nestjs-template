import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AuthUser } from '../../../interfaces';
import { PostRepository } from '../../repository/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { ListPostDto, ListPostResponse } from './dto/list-post.dto';
import { PostResponse } from './dto/post.dto';
import { RemovePostsDto, RemovePostsResponse } from './dto/remove-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
      posts,
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
    return this.#findByIdOrThrow(id, user);
  }

  async create(user: AuthUser, dto: CreatePostDto): Promise<PostResponse> {
    if (dto.title.length === 0) {
      throw new BadRequestException('title is empty');
    }
    if (dto.content.length === 0) {
      throw new BadRequestException('content is empty');
    }

    return this.repo.create(dto, user);
  }

  async update(
    user: AuthUser,
    id: string,
    dto: UpdatePostDto,
  ): Promise<PostResponse> {
    const found = await this.#findByIdOrThrow(id, user);

    return this.repo.update(found, dto);
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
}
