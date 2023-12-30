import { Injectable } from '@nestjs/common';

import { User } from '../../infra/prisma/prisma';
import { UserRepository } from '../../repository/user.repository';
import { UpdateMeDto, UserResponse } from './dto';

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
