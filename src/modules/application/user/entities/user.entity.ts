import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    example: '886e8222-9aff-4fd3-87dd-02344242a17c',
  })
  id!: string;

  @ApiProperty({
    example: 'alice',
  })
  name!: string;
}
