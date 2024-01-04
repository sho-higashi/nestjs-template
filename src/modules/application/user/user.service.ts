import { Injectable } from '@nestjs/common';

import { User } from '../../infrastructure/prisma/prisma';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UpdateMeDto } from './dto';
import { UserResponse } from './entities';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  convert(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
    };
  }

  async update(user: User, data: UpdateMeDto): Promise<UserResponse> {
    const updated = await this.repository.update(user, data);

    return this.convert(updated);
  }
}
