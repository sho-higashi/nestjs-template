import { Module } from '@nestjs/common';

import { AppLoggingService } from './app-logging.service';

@Module({
  providers: [AppLoggingService],
})
export class AppLoggingModule {}
