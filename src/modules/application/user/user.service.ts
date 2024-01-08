import { Injectable } from '@nestjs/common';

import { User as PrismaPost } from '../../infrastructure/prisma/prisma';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UpdateMeDto } from './dto';
import { User } from './response';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  convert(user: PrismaPost): User {
    return {
      id: user.id,
      name: user.name,
    };
  }

  async update(user: PrismaPost, data: UpdateMeDto): Promise<User> {
    const updated = await this.repository.update(user, data);

    return this.convert(updated);
  }
}
