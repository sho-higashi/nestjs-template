import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { CronService } from './interval.scheduler/cron.service';
import { IntervalScheduler } from './interval.scheduler/interval.scheduler';

@Module({
  imports: [DiscoveryModule],
  providers: [IntervalScheduler, CronService],
})
export class SchedulerModule {}
