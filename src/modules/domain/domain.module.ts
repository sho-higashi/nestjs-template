import { Module } from '@nestjs/common';

import { AccountUsersModule } from './account-users/account-users.module';
import { CoffeesModule } from './coffees/coffees.module';
import { DataSourceModule } from './data-source/data-source.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { I18nModule } from './i18n/i18n.module';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    CoffeesModule,
    FibonacciModule,
    TagsModule,
    AccountUsersModule,
    DataSourceModule,
    I18nModule,
  ],
})
export class DomainModule {}
