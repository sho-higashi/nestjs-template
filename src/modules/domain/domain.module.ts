import { Module } from '@nestjs/common';

import { CoreModule } from '../../core/core.module';
import { AlarmsModule } from './alarms/application/alarms.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PostModule, AlarmsModule, CoreModule],
})
export class DomainModule {}
