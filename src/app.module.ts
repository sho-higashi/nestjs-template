import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { CLS_ID, ClsModule } from 'nestjs-cls';

import { AppExceptionFilter } from './filters';
import { AppResponseInterceptor } from './interceptors';
import { DomainModule } from './modules/domain/domain.module';
import { InfraModule } from './modules/infra/infra.module';
import { RepositoryModule } from './modules/repository/repository.module';

@Module({
  imports: [
    InfraModule,
    RepositoryModule,
    DomainModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls) => {
          cls.set(CLS_ID, randomUUID());
        },
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
