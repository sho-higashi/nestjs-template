import { ApiProperty } from '@nestjs/swagger';

import { PostResponse } from './post.dto';

export class ListPostDto {
  @ApiProperty({
    default: 20,
    example: 20,
    required: false,
    type: Number,
  })
  limit?: number | null;

  @ApiProperty({
    default: 0,
    example: 0,
    required: false,
    type: Number,
  })
  offset?: number | null;

  @ApiProperty({
    default: 'desc',
    enum: ['asc', 'desc'],
    example: 'asc',
    required: false,
  })
  order?: 'asc' | 'desc' | null;

  @ApiProperty({
    default: 'createdAt',
    enum: ['createdAt', 'updatedAt'],
    example: 'createdAt',
    required: false,
  })
  orderBy?: 'createdAt' | 'updatedAt' | null;
}

export class PaginationDto {
  @ApiProperty()
  page!: number;

  @ApiProperty()
  perPage!: number;
}

export class ListPostResponse {
  @ApiProperty({
    type: [PostResponse],
  })
  posts!: PostResponse[];

  @ApiProperty()
  totalCount!: number;

  @ApiProperty()
  pagination!: PaginationDto;
}
