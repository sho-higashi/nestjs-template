import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { DOCUMENT_JWT_AUTH_NAME } from '../../../consts';
import { AuthUser } from '../../interfaces';
import { ErrorResponse } from '../shared';
import { UpdateMeDto } from './dto';
import { UserResponse } from './entities';
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
  @ApiOperation({ summary: "get requested user's profile" })
  @ApiOkResponse({ type: UserResponse })
  @ApiForbiddenResponse({ type: ErrorResponse })
  getMe(@CurrentUser() user: AuthUser): UserResponse {
    return this.service.convert(user);
  }

  @Patch('/me')
  @ApiOperation({ summary: "update requested user's profile" })
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
