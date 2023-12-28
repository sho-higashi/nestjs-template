import { Body, Controller, Get, Patch } from '@nestjs/common';

import { AuthUser } from '../../../interfaces';
import { UpdateMeDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user.dto';
import { CurrentUser } from './user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/me')
  getMe(@CurrentUser() user: AuthUser): UserResponse {
    return user;
  }

  @Patch('/me')
  updateMe(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateMeDto,
  ): Promise<UserResponse> {
    return this.service.update(user, dto);
  }
}
