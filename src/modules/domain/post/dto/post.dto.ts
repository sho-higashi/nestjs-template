import { ApiProperty } from '@nestjs/swagger';

import { Post } from '../../../infra/prisma/prisma';

export class PostResponse implements Omit<Post, 'authorId' | 'removedAt'> {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @ApiProperty({ type: Boolean })
  removed!: boolean;
}
