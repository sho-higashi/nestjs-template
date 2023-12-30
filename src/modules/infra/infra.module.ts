import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { AppLoggingModule } from './app-logging/app-logging.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AppConfigModule, AppLoggingModule, PrismaModule, HealthCheckModule],
})
export class InfraModule {}
