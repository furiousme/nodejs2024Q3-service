import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsNumber()
  year: number;
}
