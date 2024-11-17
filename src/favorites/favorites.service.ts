import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { TrackRepository } from 'src/track/track.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepo: FavoritesRepository,
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    private readonly albumRepo: AlbumRepository,
    private readonly trackRepo: TrackRepository,
  ) {}

  async getAll() {
    const artistsIds = await this.favoritesRepo.getArtists();
    const albumsIds = await this.favoritesRepo.getAlbums();
    const tracksIds = await this.favoritesRepo.getTracks();
    const [artists, albums, tracks] = await Promise.all([
      Promise.all([
        ...artistsIds.map(async (id) => {
          const res = await this.artistRepo.findBy({ id });
          return res[0];
        }),
      ]),
      Promise.all([...albumsIds.map((id) => this.albumRepo.findById(id))]),
      Promise.all([...tracksIds.map((id) => this.trackRepo.findById(id))]),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addArtist(artistId: string) {
    const artist = await this.artistRepo.findBy({ id: artistId });
    if (!artist) throw new UnprocessableEntityException('Entity not found');
    return this.favoritesRepo.addArtist(artistId);
  }

  async addAlbum(albumId: string) {
    const album = await this.albumRepo.findById(albumId);
    if (!album) throw new UnprocessableEntityException('Entity not found');
    return this.favoritesRepo.addAlbum(albumId);
  }

  async addTrack(trackId: string) {
    const track = await this.trackRepo.findById(trackId);
    if (!track) throw new UnprocessableEntityException('Entity not found');
    return this.favoritesRepo.addTrack(trackId);
  }

  async removeArtist(artistId: string) {
    const artistsIds = await this.favoritesRepo.getArtists();
    if (!artistsIds.includes(artistId))
      throw new NotFoundException('Entity not found in favorites');
    return this.favoritesRepo.removeArtist(artistId);
  }

  async removeAlbum(albumId: string) {
    const albumsIds = await this.favoritesRepo.getAlbums();
    if (!albumsIds.includes(albumId))
      throw new NotFoundException('Entity not found in favorites');
    return this.favoritesRepo.removeAlbum(albumId);
  }

  async removeTrack(trackId: string) {
    const tracksIds = await this.favoritesRepo.getTracks();
    if (!tracksIds.includes(trackId))
      throw new NotFoundException('Entity not found in favorites');
    return this.favoritesRepo.removeTrack(trackId);
  }

  async removeArtistIfPresent(artistId: string) {
    const artistsIds = await this.favoritesRepo.getArtists();
    if (artistsIds.includes(artistId)) {
      return this.favoritesRepo.removeArtist(artistId);
    }
  }

  async removeAlbumIfPresent(albumId: string) {
    const albumsIds = await this.favoritesRepo.getAlbums();
    if (albumsIds.includes(albumId)) {
      return this.favoritesRepo.removeAlbum(albumId);
    }
  }

  async removeTrackIfPresent(trackId: string) {
    const tracksIds = await this.favoritesRepo.getTracks();
    if (tracksIds.includes(trackId)) {
      return this.favoritesRepo.removeTrack(trackId);
    }
  }
}
