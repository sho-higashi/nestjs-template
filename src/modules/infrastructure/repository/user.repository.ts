import { Injectable } from '@nestjs/common';

import { User } from '../prisma/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
        removedAt: null,
      },
    });
  }

  async update(user: User, data: { name: string }) {
    return this.prisma.user.update({
      data,
      where: {
        id: user.id,
      },
    });
  }
}
