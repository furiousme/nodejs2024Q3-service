import { Artist } from './artist.entity';
import { v4 as uuidv4 } from 'uuid';

export class ArtistRepository {
  private artists: Artist[] = [];

  async create(name: string, grammy: boolean) {
    const id = uuidv4();
    const newArtist = new Artist({
      id,
      name,
      grammy,
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    this.artists.push(newArtist);
    return this.findById(id);
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findById(id: string): Promise<Artist> {
    return this.artists.find((artist) => artist.id === id);
  }

  async update(id: string, artist: Artist) {
    const artistIndex = this.artists.findIndex((a) => a.id === id);
    const updatedArtist = new Artist({
      ...this.artists[artistIndex],
      ...artist,
    });
    this.artists[artistIndex] = updatedArtist;
    return this.artists[artistIndex];
  }

  async delete(id: string) {
    const artistIndex = this.artists.findIndex((a) => a.id === id);
    this.artists.splice(artistIndex, 1);
    return id;
  }
}
