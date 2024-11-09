import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
