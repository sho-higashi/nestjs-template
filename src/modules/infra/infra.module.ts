import { Module } from '@nestjs/common';

import { CustomLoggingModule } from './custom-logging/custom-logging.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CustomLoggingModule, PrismaModule, HealthCheckModule],
})
export class InfraModule {}
