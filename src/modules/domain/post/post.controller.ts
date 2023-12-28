import { Controller, Get } from '@nestjs/common';

import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  listPost(): string {
    return this.service.getHello();
  }
}
