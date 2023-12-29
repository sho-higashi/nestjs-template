import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional()
  title?: string | null;

  @ApiPropertyOptional()
  content?: string | null;
}
