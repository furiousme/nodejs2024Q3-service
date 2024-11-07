import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepo: AlbumRepository) {}

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

    const newAlbum = new Album({
      ...album,
      ...updatedAlbum,
      updated_at: new Date().toISOString(),
      version: album.version + 1,
    });
    return this.albumRepo.update(id, newAlbum);
  }

  async delete(id: string) {
    const album = await this.albumRepo.findById(id);
    if (!album) throw new NotFoundException('Album not found');
    return this.albumRepo.delete(id);
  }
}
