import { ApiProperty } from '@nestjs/swagger';

import { Post } from '../../../infra/prisma/prisma';

export class PostResponse implements Omit<Post, 'authorId' | 'removedAt'> {
  @ApiProperty()
  content!: string;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty()
  id!: string;

  @ApiProperty({ type: Boolean })
  removed!: boolean;

  @ApiProperty()
  title!: string;

  @ApiProperty({ type: Date })
  updatedAt!: Date;
}
