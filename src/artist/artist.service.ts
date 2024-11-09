import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistRepository } from './artist.repository';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepo: ArtistRepository,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

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

    const now = new Date().getTime();
    const updatedArtist = new Artist({
      ...artist,
      ...attrs,
      updatedAt: now,
      version: artist.version + 1,
    });

    return this.artistRepo.update(id, updatedArtist);
  }

  async delete(id: string): Promise<string> {
    const artist = await this.findById(id);
    if (!artist) throw new NotFoundException('Artist not found');
    await this.albumService.removeArtistReference(id);
    await this.trackService.removeArtistReference(id);
    await this.favoritesService.removeArtistIfPresent(id);
    return this.artistRepo.delete(id);
  }
}
