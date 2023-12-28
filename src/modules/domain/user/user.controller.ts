import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
