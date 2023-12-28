import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '../../../utils';
import { AppConfigService } from './app-config.service';

@Global()
@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [AppConfigService],
})
export class AppConfigModule {}
