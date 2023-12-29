import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Post } from '../../../infra/prisma/prisma';

export class PostResponse implements Post {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  authorId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiPropertyOptional()
  removedAt!: Date | null;
}
