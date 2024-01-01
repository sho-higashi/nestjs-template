import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, ContextIdFactory } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import { CLS_ID, ClsModule } from 'nestjs-cls';

import { AggregateByLocaleContextIdStrategy } from './core/aggregate-by-locale.strategy';
// import { AggregateByTenantContextIdStrategy } from './core/aggregate-by-tenant.strategy';
import { AppExceptionFilter } from './filters';
import { AppResponseInterceptor } from './interceptors';
import { ApiDocumentModule } from './modules/api-document/api-document.module';
import { DomainModule } from './modules/domain/domain.module';
import { InfraModule } from './modules/infra/infra.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { PaymentsModule } from './payments/payments.module';

// ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy());
@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
    PaymentsModule,
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
