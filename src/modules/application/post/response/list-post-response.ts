import { ApiProperty } from '@nestjs/swagger';

import { Post } from './post';

export class PaginationResponse {
  @ApiProperty()
  page!: number;

  @ApiProperty()
  perPage!: number;
}

export class ListPostResponse {
  @ApiProperty()
  pagination!: PaginationResponse;

  @ApiProperty({
    type: [Post],
  })
  posts!: Post[];

  @ApiProperty()
  totalCount!: number;
}
