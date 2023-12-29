import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DOCUMENT_JWT_AUTH_NAME } from '../../../consts';
import { ErrorResponse } from '../../../dtos';
import { AuthUser } from '../../../interfaces';
import { UpdateMeDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user.dto';
import { CurrentUser } from './user.decorator';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth(DOCUMENT_JWT_AUTH_NAME)
@UseGuards(UserGuard)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/me')
  @ApiOkResponse({ type: UserResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  getMe(@CurrentUser() user: AuthUser): UserResponse {
    return user;
  }

  @Patch('/me')
  @ApiBody({ type: UpdateMeDto })
  @ApiOkResponse({ type: UserResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  updateMe(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateMeDto,
  ): Promise<UserResponse> {
    return this.service.update(user, dto);
  }
}
