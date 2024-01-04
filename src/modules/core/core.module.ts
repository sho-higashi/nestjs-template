import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '../../utils';
import { AppConfigService } from './app-config.service';
import { AppLoggingService } from './app-logging.service';

@Global()
@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [AppConfigService, AppLoggingService],
})
export class CoreModule {}
