import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    example: '/users/me',
  })
  path!: string;

  @ApiProperty({
    example: 'alice',
    type: Number,
  })
  statusCode!: number;

  @ApiProperty({
    example: '2023-12-29T16:52:26.720Z',
  })
  timestamp!: string;
}
