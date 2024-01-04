import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async pingCheck(key: string) {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError('health check failed', key);
    }
  }
}
