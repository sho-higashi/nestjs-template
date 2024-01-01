import { ApiProperty } from '@nestjs/swagger';

import { PostResponse } from './post.entity';

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
