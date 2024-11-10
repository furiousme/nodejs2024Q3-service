import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The name of the album',
    example: 'The Dark Side of the Moon',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The year the album was released',
    example: 1973,
  })
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    description: 'The ID of the artist associated with the album',
    example: '8e2e5fb1-3fab-400e-a89c-010ec8e8aea3',
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;
}
