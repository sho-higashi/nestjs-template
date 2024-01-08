import { ApiProperty } from '@nestjs/swagger';

import { Post as PrismaPost } from '../../../infrastructure/prisma/prisma';

export class Post implements Omit<PrismaPost, 'authorId' | 'removedAt'> {
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
