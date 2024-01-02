import { Module } from '@nestjs/common';

import { SharedInfraStructureModule } from './infrastructure/shared-infrastructure.module';

@Module({
  exports: [SharedInfraStructureModule],
  imports: [SharedInfraStructureModule],
})
export class SharedModule {}
