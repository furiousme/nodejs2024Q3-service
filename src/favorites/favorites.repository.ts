import { Injectable } from '@nestjs/common';

type FavoritesRecords = {
  artists: string[];
  albums: string[];
  tracks: string[];
};

const initialFavorites: FavoritesRecords = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class FavoritesRepository {
  private favorites: FavoritesRecords = initialFavorites;

  async getArtists() {
    return this.favorites.artists;
  }

  async getAlbums() {
    return this.favorites.albums;
  }

  async getTracks() {
    return this.favorites.tracks;
  }

  async addTrack(trackId: string) {
    this.favorites.tracks.push(trackId);
    return trackId;
  }

  async addAlbum(albumId: string) {
    this.favorites.albums.push(albumId);
    return albumId;
  }

  async addArtist(artistId: string) {
    this.favorites.artists.push(artistId);
    return artistId;
  }

  async removeArtist(artistId: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (el) => el !== artistId,
    );
    return artistId;
  }

  async removeAlbum(albumId: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (el) => el !== albumId,
    );
    return albumId;
  }

  async removeTrack(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (el) => el !== trackId,
    );
    return trackId;
  }
}
