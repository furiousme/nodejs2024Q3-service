import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @ApiPropertyOptional({ description: 'New name', example: 'Vivaldi' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'New grammy', example: false })
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
