export class Track {
  id: string;

  name: string;

  artistId: string | null;

  albumId: string | null;

  duration: number;

  version: number;

  created_at: string;

  updated_at: string;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
