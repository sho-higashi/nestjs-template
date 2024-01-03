import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    example: '/request/path',
  })
  path!: string;

  @ApiProperty({
    example: 400,
    type: Number,
  })
  statusCode!: number;

  @ApiProperty({
    example: '2023-12-29T16:52:26.720Z',
  })
  timestamp!: string;
}
