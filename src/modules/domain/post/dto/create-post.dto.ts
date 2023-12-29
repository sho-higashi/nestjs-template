import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
  })
  title!: string;

  @ApiProperty()
  content!: string;
}
