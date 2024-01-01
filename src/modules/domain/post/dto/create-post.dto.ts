import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  content!: string;

  @ApiProperty({
    description: 'The title of the post.',
  })
  title!: string;
}
