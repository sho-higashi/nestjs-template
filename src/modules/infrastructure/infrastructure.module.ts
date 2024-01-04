import { Module } from '@nestjs/common';

import { HealthCheckModule } from './health-check/health-check.module';
import { PrismaModule } from './prisma/prisma.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [PrismaModule, HealthCheckModule, RepositoryModule],
})
export class InfrastructureModule {}
