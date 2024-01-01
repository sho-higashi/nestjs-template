import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponse } from '../../../dto';
import { AccountUsersService } from './account-users.service';
import { CreateAccountUserDto } from './dto/create-account-user.dto';
import { UpdateAccountUserDto } from './dto/update-account-user.dto';
import { AccountUser } from './entities/account-user.entity';

@ApiTags('account-users')
@Controller('account-users')
export class AccountUsersController {
  constructor(private readonly accountUsersService: AccountUsersService) {}

  @Post()
  @ApiOperation({ summary: 'create post' })
  @ApiOkResponse({ type: AccountUser })
  @ApiBadRequestResponse({ type: ErrorResponse })
  create(@Body() createAccountUserDto: CreateAccountUserDto) {
    return this.accountUsersService.create(createAccountUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'get posts' })
  @ApiOkResponse({ type: [AccountUser] })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findAll() {
    return this.accountUsersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get post' })
  @ApiOkResponse({ type: AccountUser })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findOne(@Param('id') id: string) {
    return this.accountUsersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update post' })
  @ApiOkResponse({ type: AccountUser })
  @ApiBadRequestResponse({ type: ErrorResponse })
  update(
    @Param('id') id: string,
    @Body() updateAccountUserDto: UpdateAccountUserDto,
  ) {
    return this.accountUsersService.update(+id, updateAccountUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete post' })
  @ApiOkResponse({ type: AccountUser })
  @ApiBadRequestResponse({ type: ErrorResponse })
  remove(@Param('id') id: string) {
    return this.accountUsersService.remove(+id);
  }
}
