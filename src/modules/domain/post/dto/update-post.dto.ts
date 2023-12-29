import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: 'new title of the post',
    required: false,
    type: String,
  })
  title?: string | null;

  @ApiProperty({
    description: 'new content of the post',
    required: false,
    type: String,
  })
  content?: string | null;
}
