import { Module } from '@nestjs/common';

import { RepositoryModule } from '../../infrastructure/repository/repository.module';
import { UserController } from './user.controller';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [RepositoryModule],
  providers: [UserService, UserGuard],
})
export class UserModule {}
