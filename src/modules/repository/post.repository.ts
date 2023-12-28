import { Injectable } from '@nestjs/common';

import { Post, Prisma, User } from '../infra/prisma/prisma';
import { PrismaService } from '../infra/prisma/prisma.service';

type Where = {
  owner: User;
};

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  #prismaWhere = (where: Where): Prisma.PostWhereInput => {
    return { authorId: where.owner.id, removedAt: null };
  };

  async list({
    limit,
    offset,
    order,
    orderBy,
    where,
  }: {
    limit: number;
    offset: number;
    order: 'asc' | 'desc';
    orderBy: 'createdAt' | 'updatedAt';
    where: Where;
  }) {
    return this.prisma.post.findMany({
      orderBy: { [orderBy]: order },
      skip: offset,
      take: limit,
      where: this.#prismaWhere(where),
    });
  }

  async count(where: Where) {
    return this.prisma.post.count({
      where: this.#prismaWhere(where),
    });
  }

  async findById(id: string, owner: User) {
    return this.prisma.post.findUnique({ where: { authorId: owner.id, id } });
  }

  async findByIds(ids: string[], owner: User) {
    return this.prisma.post.findMany({
      where: { authorId: owner.id, id: { in: ids } },
    });
  }

  async create(data: { content: string; title: string }, createdBy: User) {
    return this.prisma.post.create({
      data: {
        ...data,
        author: {
          connect: { id: createdBy.id },
        },
      },
    });
  }

  async update(
    target: Post,
    data: {
      content?: string | null;
      title?: string | null;
    },
  ) {
    const updateData: {
      content?: string;
      title?: string;
    } = {};

    if (data.content !== undefined) {
      data.content = data.content ?? '';
    }

    if (data.title !== undefined) {
      data.title = data.title ?? '';
    }

    return this.prisma.post.update({
      data: updateData,
      where: { id: target.id },
    });
  }

  async removeMany(targets: Post[]) {
    const removedAt = new Date();

    return this.prisma.post.updateMany({
      data: { removedAt },
      where: { id: { in: targets.map((t) => t.id) } },
    });
  }
}
