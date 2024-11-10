import { Exclude } from 'class-transformer';

export class Album {
  id: string;

  name: string;

  year: number;

  artistId: string | null;

  @Exclude()
  version: number;

  @Exclude()
  createdAt: number;

  @Exclude()
  updatedAt: number;

  constructor(partial: Partial<Album>) {
    return Object.assign(this, partial);
  }
}
