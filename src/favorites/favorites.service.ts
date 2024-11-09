import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { ArtistRepository } from 'src/artist/artist.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { TrackRepository } from 'src/track/track.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepo: FavoritesRepository,
    private readonly artistRepo: ArtistRepository,
    private readonly albumRepo: AlbumRepository,
    private readonly trackRepo: TrackRepository,
  ) {}

  async getAll() {
    const artistsIds = await this.favoritesRepo.getArtists();
    const albumsIds = await this.favoritesRepo.getAlbums();
    const tracksIds = await this.favoritesRepo.getTracks();

    return {
      artists: artistsIds,
      albums: albumsIds,
      tracks: tracksIds,
    };
  }

  async addArtist(artistId: string) {
    const artist = await this.artistRepo.findById(artistId);
    if (!artist) throw new NotFoundException('Artist not found');
    return this.favoritesRepo.addArtist(artistId);
  }

  async addAlbum(albumId: string) {
    const album = await this.albumRepo.findById(albumId);
    if (!album) throw new NotFoundException('Album not found');
    return this.favoritesRepo.addAlbum(albumId);
  }

  async addTrack(trackId: string) {
    const track = await this.trackRepo.findById(trackId);
    if (!track) throw new NotFoundException('Track not found');
    return this.favoritesRepo.addTrack(trackId);
  }

  async removeArtist(artistId: string) {
    const artistsIds = await this.favoritesRepo.getArtists();
    if (!artistsIds.includes(artistId))
      throw new NotFoundException('Artist not found in favorites');
    return this.favoritesRepo.removeArtist(artistId);
  }

  async removeAlbum(albumId: string) {
    const albumsIds = await this.favoritesRepo.getAlbums();
    if (!albumsIds.includes(albumId))
      throw new NotFoundException('Album not found in favorites');
    return this.favoritesRepo.removeAlbum(albumId);
  }

  async removeTrack(trackId: string) {
    const tracksIds = await this.favoritesRepo.getTracks();
    if (!tracksIds.includes(trackId))
      throw new NotFoundException('Track not found in favorites');
    return this.favoritesRepo.removeTrack(trackId);
  }
}
