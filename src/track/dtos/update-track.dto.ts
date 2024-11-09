import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsOptional()
  @IsNumber()
  duration: number;
}
