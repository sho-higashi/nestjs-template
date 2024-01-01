import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { AppLoggingModule } from './app-logging/app-logging.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { HttpClientModule } from './http-client/http-client.module';
import { PrismaModule } from './prisma/prisma.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    AppConfigModule,
    AppLoggingModule,
    PrismaModule,
    HealthCheckModule,
    SchedulerModule,
    HttpClientModule.register({
      baseUrl: 'http://nestjs.com',
      isGlobal: true,
    }),
  ],
})
export class InfraModule {}
