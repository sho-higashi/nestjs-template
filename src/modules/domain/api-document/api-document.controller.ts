import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs';

import { SCHEMA_FILE_NAME } from '../../../consts';

@Controller('api-document')
export class ApiDocumentController {
  @Get()
  getApiDocument(@Res() res: Response) {
    res.status(200);

    return fs.createReadStream(`./src/${SCHEMA_FILE_NAME}`).pipe(res);
  }
}
