import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CLS_ID, ClsModule } from 'nestjs-cls';

import { AppExceptionFilter } from './filters';
import { AppResponseInterceptor } from './interceptors';
import { ApiDocumentModule } from './modules/api-document/api-document.module';
import { DomainModule } from './modules/domain/domain.module';
import { InfraModule } from './modules/infra/infra.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    InfraModule,
    RepositoryModule,
    DomainModule,
    ApiDocumentModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls) => {
          cls.set(CLS_ID, randomUUID());
        },
      },
    }),
    SharedModule,
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
