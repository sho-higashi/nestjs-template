import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../infra/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
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
