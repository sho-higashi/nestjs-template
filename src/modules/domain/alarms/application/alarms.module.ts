import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PrismaModule } from '../../../infra/prisma/prisma.module';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { OrmAlarmPersistenceModule } from '../infrastructure/persistence/orm/orm-persistence.module';
import { OrmCreateAlarmRepository } from '../infrastructure/persistence/orm/repositories/create-alarm.repository';
import { OrmFindAlarmsRepository } from '../infrastructure/persistence/orm/repositories/find-alarms.repository';
import { OrmUpsertMaterializedAlarmRepository } from '../infrastructure/persistence/orm/repositories/upsert-materialized-alarm.repository';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from '../infrastructure/persistence/orm/schemas/materialized-alarm-view';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { CreateAlarmRepository } from './ports/create-alarm.repository';
import { FindAlarmsRepository } from './ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from './ports/upsert-materialized-alarm.repository';
import { GetAlarmsCommandHandler } from './queries/get-alarms.query-handler';

@Module({
  controllers: [AlarmsController],
  imports: [
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
    OrmAlarmPersistenceModule,
    PrismaModule,
  ],
  providers: [
    AlarmsService,
    AlarmFactory,
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
    CreateAlarmCommandHandler,
    GetAlarmsCommandHandler,
    AlarmCreatedEventHandler,
  ],
})
export class AlarmsModule {}
