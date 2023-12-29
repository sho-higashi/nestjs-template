import { Module } from '@nestjs/common';

import { ApiDocumentController } from './api-document.controller';

@Module({
  controllers: [ApiDocumentController],
})
export class ApiDocumentModule {}
