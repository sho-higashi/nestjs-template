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
import { User } from './response';
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
  @ApiOkResponse({ type: User })
  @ApiForbiddenResponse({ type: ErrorResponse })
  getMe(@CurrentUser() user: AuthUser): User {
    return this.service.convert(user);
  }

  @Patch('/me')
  @ApiOperation({ summary: "update requested user's profile" })
  @ApiBody({ type: UpdateMeDto })
  @ApiOkResponse({ type: User })
  @ApiForbiddenResponse({ type: ErrorResponse })
  updateMe(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateMeDto,
  ): Promise<User> {
    return this.service.update(user, dto);
  }
}
