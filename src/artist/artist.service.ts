import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepo: ArtistRepository) {}

  create(name: string, grammy: boolean): Promise<Artist> {
    return this.artistRepo.create(name, grammy);
  }

  findAll(): Promise<Artist[]> {
    return this.artistRepo.findAll();
  }

  findById(id: string): Promise<Artist> {
    return this.artistRepo.findById(id);
  }

  async update(id: string, attrs: Partial<Artist>): Promise<Artist> {
    const artist = await this.findById(id);
    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = new Artist({
      ...artist,
      ...attrs,
      updated_at: new Date().toISOString(),
      version: artist.version + 1,
    });

    return this.artistRepo.update(id, updatedArtist);
  }

  async delete(id: string): Promise<string> {
    const artist = await this.findById(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return this.artistRepo.delete(id);
  }
}
