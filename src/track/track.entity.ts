import { Exclude } from 'class-transformer';

export class Track {
  id: string;

  name: string;

  artistId: string | null;

  albumId: string | null;

  duration: number;

  @Exclude()
  version: number;

  @Exclude()
  createdAt: number;

  @Exclude()
  updatedAt: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
