import { Module } from '@nestjs/common';

import { RepositoryModule } from '../../repository/repository.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  imports: [RepositoryModule],
  providers: [PostService],
})
export class PostModule {}
