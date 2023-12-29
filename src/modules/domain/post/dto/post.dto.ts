import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    type: Date,
  })
  createdAt!: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    type: Date,
  })
  removedAt!: Date | null;
}
