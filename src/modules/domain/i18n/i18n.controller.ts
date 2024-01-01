import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponse } from '../../../dto';
import { I18nService } from './i18n.service';

@ApiTags('i18n')
@Controller('i18n')
export class I18nController {
  constructor(private readonly i18nService: I18nService) {}

  @Get('greeting')
  @ApiOperation({
    summary: `receive greeting, usage
      curl -H 'accept-language: pl' 'localhost:3000/i18n/greeting'
      curl -H 'accept-language: en' 'localhost:3000/i18n/greeting'`,
  })
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({ type: ErrorResponse })
  findAll() {
    return this.i18nService.translate('HELLO', { firstName: 'Kamil' });
  }
}
