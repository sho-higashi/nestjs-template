import { Injectable } from '@nestjs/common';

import { User } from '../../infra/prisma/prisma';
import { UserRepository } from '../../repository/user.repository';
import { UpdateMeDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async update(user: User, data: UpdateMeDto): Promise<User> {
    return this.repository.update(user, data);
  }
}
