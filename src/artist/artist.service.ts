import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './artist.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
    private readonly logger: LoggingService,
  ) {}

  create(name: string, grammy: boolean): Promise<Artist> {
    const artist = this.artistRepo.create({ name, grammy });
    this.logger.log(`Artist ${artist.name} created`);
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
    if (!artist) {
      this.logger.error(`Artist ${id} not found`, 'ArtistService');
      throw new NotFoundException('Artist not found');
    }

    Object.assign(artist, attrs);
    return this.artistRepo.save(artist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.findById(id);
    const silent = true;
    if (!artist) {
      this.logger.error(`Artist ${id} not found`, 'ArtistService');
      throw new NotFoundException('Artist not found');
    }
    await this.albumService.removeArtistReference(id);
    await this.trackService.removeArtistReference(id);
    await this.favoritesService.removeArtist(id, silent);
    this.artistRepo.remove(artist);
  }
}
