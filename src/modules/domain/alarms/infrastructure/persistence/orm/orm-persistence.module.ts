import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InfraModule } from '../../../../../infra/infra.module';
import { PrismaModule } from '../../../../../infra/prisma/prisma.module';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-materialized-alarm.repository';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view';

const providers = [
  OrmCreateAlarmRepository,
  OrmFindAlarmsRepository,
  OrmUpsertMaterializedAlarmRepository,
];
@Module({
  exports: providers,
  imports: [
    PrismaModule,
    InfraModule,
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers,
})
export class OrmAlarmPersistenceModule {}
