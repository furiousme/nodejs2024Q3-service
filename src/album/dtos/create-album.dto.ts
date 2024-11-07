import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string | null;
}
