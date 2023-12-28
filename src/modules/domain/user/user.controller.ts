import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
