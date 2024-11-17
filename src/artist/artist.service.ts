import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  create(name: string, grammy: boolean): Promise<Artist> {
    const artist = this.artistRepo.create({ name, grammy });
    return this.artistRepo.save(artist);
  }

  findAll(): Promise<Artist[]> {
    return this.artistRepo.find();
  }

  findById(id: string): Promise<Artist> {
    return this.artistRepo.findOneBy({ id });
  }

  async update(id: string, attrs: Partial<Artist>): Promise<Artist> {
    const artist = await this.findById(id);
    if (!artist) throw new NotFoundException('Artist not found');

    Object.assign(artist, { ...attrs });
    return this.artistRepo.save(artist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.findById(id);
    if (!artist) throw new NotFoundException('Artist not found');
    await this.albumService.removeArtistReference(id);
    await this.trackService.removeArtistReference(id);
    await this.favoritesService.removeArtistIfPresent(id);
    this.artistRepo.remove(artist);
  }
}
