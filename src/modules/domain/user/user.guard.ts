import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';

import { UserRepository } from '../../repository/user.repository';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly repository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.#extractIdFromHeader(request);

    const id = token;
    const user = id ? await this.repository.findById(id) : null;
    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }

  #extractIdFromHeader(request: Request) {
    try {
      return request.headers.authorization?.split(' ')[1];
    } catch (error) {}
  }
}
