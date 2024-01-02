import { Module } from '@nestjs/common';

import { PrismaModule } from '../modules/infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class CoreModule {}
