import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeDto {
  @ApiProperty()
  name!: string;
}
