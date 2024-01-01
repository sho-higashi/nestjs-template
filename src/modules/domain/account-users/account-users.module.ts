import { Module } from '@nestjs/common';

import { DataSourceModule } from '../data-source/data-source.module';
import { AccountUsersController } from './account-users.controller';
import { AccountUsersService } from './account-users.service';

@Module({
  controllers: [AccountUsersController],
  imports: [DataSourceModule],
  providers: [AccountUsersService],
})
export class AccountUsersModule {}
