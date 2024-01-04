import { Module } from '@nestjs/common';

import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { UserController } from './user.controller';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [InfrastructureModule],
  providers: [UserService, UserGuard],
})
export class UserModule {}
