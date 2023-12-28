import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { PrismaModule } from '../prisma/prisma.module';
import { HealthCheckController } from './health-check.controller';
import { PrismaHealthIndicator } from './prisma-health-check.indicator';

@Module({
  controllers: [HealthCheckController],
  imports: [PrismaModule, TerminusModule],
  providers: [PrismaHealthIndicator],
})
export class HealthCheckModule {}
