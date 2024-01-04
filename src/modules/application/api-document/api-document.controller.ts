import { Controller, Get, NotFoundException, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import fs from 'fs';
import { join } from 'path';

import { SCHEMA_FILE_NAME } from '../../../consts';
import { isEnvForDev } from '../../../utils';
import { AppConfigService } from '../../core/app-config.service';

/**
 * 開発用にopenapiの仕様書をjson形式で返すためのコントローラー
 * デプロイされた環境では塞ぐ
 */
@ApiExcludeController()
@Controller('api-document')
export class ApiDocumentController {
  constructor(private readonly config: AppConfigService) {}

  @Get('/api')
  getApiDocument(@Res() res: Response) {
    if (!isEnvForDev(this.config.get('ENV'))) {
      throw new NotFoundException();
    }

    res.status(200);
    fs.createReadStream(join(process.cwd(), `./src/${SCHEMA_FILE_NAME}`)).pipe(
      res,
    );
  }
}
