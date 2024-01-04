import { Module } from '@nestjs/common';

import { ApiDocumentModule } from './api-document/api-document.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ApiDocumentModule, UserModule, PostModule],
})
export class ApplicationModule {}
