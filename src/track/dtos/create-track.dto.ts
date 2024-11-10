import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    example: 'The Show Must Go On',
    description: 'Track name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'b73bc2c2-3b4b-4b4b-8b4b-8b4b8b4b8b4b',
    description: 'Artist id',
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;

  @ApiProperty({
    example: 'null',
    description: 'Album id',
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  albumId: string | null;

  @ApiProperty({
    example: 180,
    description: 'Track duration',
  })
  @IsNumber()
  duration: number;
}
