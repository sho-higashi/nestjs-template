import { Module } from '@nestjs/common';

import { I18nController } from './i18n.controller';
import { I18nService } from './i18n.service';

@Module({
  controllers: [I18nController],
  exports: [I18nService],
  providers: [I18nService],
})
export class I18nModule {}
