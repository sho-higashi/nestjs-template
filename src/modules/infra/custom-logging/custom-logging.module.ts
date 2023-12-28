import { Module } from '@nestjs/common';

import { CustomLoggingService } from './custom-logging.service';

@Module({
  providers: [CustomLoggingService],
})
export class CustomLoggingModule {}
