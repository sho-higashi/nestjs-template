import { PartialType } from '@nestjs/swagger';

import { CreateAccountUserDto } from './create-account-user.dto';

export class UpdateAccountUserDto extends PartialType(CreateAccountUserDto) {}
