import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../interfaces';
import { UpdateMeDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user.dto';
import { CurrentUser } from './user.decorator';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@ApiTags('users')
@UseGuards(UserGuard)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/me')
  @ApiOkResponse({ type: UserResponse })
  getMe(@CurrentUser() user: AuthUser): UserResponse {
    return user;
  }

  @Patch('/me')
  @ApiBody({ type: UpdateMeDto })
  @ApiOkResponse({ type: UserResponse })
  updateMe(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateMeDto,
  ): Promise<UserResponse> {
    return this.service.update(user, dto);
  }
}
