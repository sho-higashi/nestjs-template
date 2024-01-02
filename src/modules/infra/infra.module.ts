import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from '../domain/alarms/infrastructure/persistence/orm/schemas/materialized-alarm-view';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { AppLoggingModule } from './app-logging/app-logging.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AppConfigModule,
    AppLoggingModule,
    PrismaModule,
    HealthCheckModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        uri: config.get('MONGO_DATABASE_URL'),
      }),
    }),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
    MongooseModule.forRootAsync({
      connectionName: EVENT_STORE_CONNECTION,
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        directConnection: true,
        uri: config.get('DATA_SOURCE_DATABASE_URL'),
      }),
    }),
  ],
})
export class InfraModule {}
