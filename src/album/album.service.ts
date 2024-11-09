import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepo: AlbumRepository,
    private readonly tracksService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  create(name: string, year: number, artistId?: string) {
    return this.albumRepo.create(name, year, artistId);
  }

  findAll() {
    return this.albumRepo.findAll();
  }

  findById(id: string) {
    return this.albumRepo.findById(id);
  }

  async update(id: string, updatedAlbum: Partial<Album>) {
    const album = await this.albumRepo.findById(id);
    if (!album) throw new NotFoundException('Album not found');

    const now = new Date().getTime();
    const newAlbum = new Album({
      ...album,
      ...updatedAlbum,
      updatedAt: now,
      version: album.version + 1,
    });
    return this.albumRepo.update(id, newAlbum);
  }

  async delete(id: string) {
    const album = await this.albumRepo.findById(id);
    if (!album) throw new NotFoundException('Album not found');
    await this.tracksService.removeAlbumReference(id);
    await this.favoritesService.removeAlbumIfPresent(id);
    return this.albumRepo.delete(id);
  }

  async removeArtistReference(artistId: string) {
    return this.albumRepo.removeArtistReference(artistId);
  }
}
