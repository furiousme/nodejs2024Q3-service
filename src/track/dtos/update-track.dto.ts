import { IsOptional, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  albumId: string | null;

  @IsOptional()
  duration: number;
}
