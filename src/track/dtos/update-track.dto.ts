import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @ApiPropertyOptional({
    description: 'New Track name',
    example: 'Billie Jean',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'New artist id',
    example: 'd50234dc-0c9a-4705-be16-16c41ee02f3a',
  })
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  artistId: string | null;

  @ApiPropertyOptional({
    description: 'New album id',
    example: null,
  })
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  albumId: string | null;

  @ApiProperty({
    description: 'New track duration',
    example: 345,
  })
  @IsOptional()
  @IsNumber()
  duration: number;
}
