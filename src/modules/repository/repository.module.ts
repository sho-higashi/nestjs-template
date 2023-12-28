import { Module } from '@nestjs/common';

import { PrismaModule } from '../infra/prisma/prisma.module';
import { PostRepository } from './post.repository';
import { UserRepository } from './user.repository';

const providers = [PostRepository, UserRepository];

@Module({
  exports: providers,
  imports: [PrismaModule],
  providers,
})
export class RepositoryModule {}
