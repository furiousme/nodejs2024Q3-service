export class Album {
  id: string;

  name: string;

  year: number;

  artistId: string | null;

  version: number;

  created_at: string;

  updated_at: string;

  constructor(partial: Partial<Album>) {
    return Object.assign(this, partial);
  }
}
