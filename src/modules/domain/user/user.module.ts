import { Module } from '@nestjs/common';

import { RepositoryModule } from '../../repository/repository.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [RepositoryModule],
  providers: [UserService],
})
export class UserModule {}
