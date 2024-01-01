import { Module } from '@nestjs/common';

import { DataSourceService } from './data-source.service';

@Module({
  exports: [DataSourceService],
  providers: [DataSourceService],
})
export class DataSourceModule {}
