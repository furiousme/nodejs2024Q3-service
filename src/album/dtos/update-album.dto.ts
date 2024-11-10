import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @ApiPropertyOptional({
    example: 'Dangerous',
    description: 'A new name of the album',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: '464b1dd2-3a1f-443b-99ac-331f827159c8',
    description: 'A new id of the artist',
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString()
  artistId: string | null;

  @ApiPropertyOptional({
    example: 1991,
    description: 'A new year of the album',
  })
  @IsOptional()
  @IsNumber()
  year: number;
}
