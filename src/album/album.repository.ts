import { Injectable } from '@nestjs/common';
import { Album } from './album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumRepository {
  private albums: Album[] = [];

  async create(
    name: string,
    year: number,
    artistId: string | null,
  ): Promise<Album> {
    const id = uuidv4();
    const newAlbum = new Album({
      id,
      name,
      year,
      artistId,
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    this.albums.push(newAlbum);
    return this.findById(id);
  }
  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findById(id: string): Promise<Album> {
    return this.albums.find((album) => album.id === id);
  }

  async update(id: string, album: Album) {
    const albumIndex = this.albums.findIndex((a) => a.id === id);
    const updatedAlbum = new Album({
      ...this.albums[albumIndex],
      ...album,
    });
    this.albums[albumIndex] = updatedAlbum;
    return this.albums[albumIndex];
  }

  async delete(id: string) {
    const albumIndex = this.albums.findIndex((a) => a.id === id);
    this.albums.splice(albumIndex, 1);
    return id;
  }

  async removeArtistReference(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
