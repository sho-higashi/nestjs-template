import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeDto {
  @ApiProperty({
    example: 'bob',
  })
  name!: string;
}
