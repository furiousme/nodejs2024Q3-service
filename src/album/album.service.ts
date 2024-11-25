import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './album.entity';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
    private readonly tracksService: TrackService,
    private readonly favoritesService: FavoritesService,
    private readonly logger: LoggingService,
  ) {}

  create(name: string, year: number, artistId?: string) {
    const album = this.albumRepo.create({ name, year, artistId });
    return this.albumRepo.save(album);
  }

  findAll() {
    return this.albumRepo.find();
  }

  findById(id: string) {
    return this.albumRepo.findOneBy({ id });
  }

  async update(id: string, attrs: Partial<Album>) {
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) {
      this.logger.error(`Album ${id} not found`, 'AlbumService');
      throw new NotFoundException('Album not found');
    }

    Object.assign(album, attrs);
    return this.albumRepo.save(album);
  }

  async delete(id: string) {
    const album = await this.albumRepo.findOneBy({ id });
    const silent = true;
    if (!album) {
      this.logger.error(`Album ${id} not found`, 'AlbumService');
      throw new NotFoundException('Album not found');
    }
    await this.tracksService.removeAlbumReference(id);
    await this.favoritesService.removeAlbum(id, silent);
    return this.albumRepo.remove(album);
  }

  async removeArtistReference(artistId: string) {
    const albums = await this.albumRepo.findBy({ artistId });
    if (albums.length === 0) return;
    const updatedAlbums = albums.map((album) => {
      album.artistId = null;
      return album;
    });

    await this.albumRepo.save(updatedAlbums);
  }
}
