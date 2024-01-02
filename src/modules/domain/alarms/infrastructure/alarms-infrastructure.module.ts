import { Module } from '@nestjs/common';

import { SharedModule } from '../../../../shared/shared.module';
import { OrmAlarmPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  exports: [SharedModule],
  imports: [OrmAlarmPersistenceModule, SharedModule],
})
export class AlarmsInfrastructureModule {}
