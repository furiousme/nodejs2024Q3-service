import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Michael Jackson',
    description: 'Artist name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Grammy',
  })
  @IsBoolean()
  grammy: boolean;
}
