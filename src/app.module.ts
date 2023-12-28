import { Module } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CLS_ID, ClsModule } from 'nestjs-cls';

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
})
export class AppModule {}
