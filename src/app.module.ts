import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { CLS_ID, ClsModule } from 'nestjs-cls';

import { DomainModule } from './modules/domain/domain.module';
import { InfraModule } from './modules/infra/infra.module';
import { validate } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    DomainModule,
    InfraModule,
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
