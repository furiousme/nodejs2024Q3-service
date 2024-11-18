import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Repository } from 'typeorm';
import { Album } from 'src/album/album.entity';
import { Track } from 'src/track/track.entity';
import { ContentType, Favorites } from './favorites.enity';
import { In } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepo: Repository<Favorites>,

    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,

    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,

    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
  ) {}

  async getAll() {
    const artistsIds = await this.favoritesRepo.find({
      select: ['contentId'],
      where: { contentType: ContentType.ARTIST },
    });
    const albumsIds = await this.favoritesRepo.find({
      select: ['contentId'],
      where: { contentType: ContentType.ALBUM },
    });
    const tracksIds = await this.favoritesRepo.find({
      select: ['contentId'],
      where: { contentType: ContentType.TRACK },
    });

    const artistsPromise = this.artistRepo.findBy({
      id: In(artistsIds.map((el) => el.contentId)),
    });

    const albumsPromise = this.albumRepo.findBy({
      id: In(albumsIds.map((el) => el.contentId)),
    });

    const tracksPromise = this.trackRepo.findBy({
      id: In(tracksIds.map((el) => el.contentId)),
    });

    const [artists, albums, tracks] = await Promise.all([
      artistsPromise,
      albumsPromise,
      tracksPromise,
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addArtist(artistId: string) {
    const artist = await this.artistRepo.findOneBy({ id: artistId });
    if (!artist) throw new UnprocessableEntityException('Entity not found');
    const record = this.favoritesRepo.create({
      contentType: ContentType.ARTIST,
      contentId: artistId,
    });
    await this.favoritesRepo.save(record);
    return record.id;
  }

  async addAlbum(albumId: string) {
    const album = await this.albumRepo.findOneBy({ id: albumId });
    if (!album) throw new UnprocessableEntityException('Entity not found');
    const record = this.favoritesRepo.create({
      contentType: ContentType.ALBUM,
      contentId: albumId,
    });
    await this.favoritesRepo.save(record);
    return record.id;
  }

  async addTrack(trackId: string) {
    const track = await this.trackRepo.findOneBy({ id: trackId });
    if (!track) throw new UnprocessableEntityException('Entity not found');
    const record = this.favoritesRepo.create({
      contentType: ContentType.TRACK,
      contentId: trackId,
    });
    await this.favoritesRepo.save(record);
    return record.id;
  }

  async removeArtist(artistId: string, silent = false) {
    const artistRecord = await this.favoritesRepo.findOneBy({
      contentId: artistId,
    });
    if (!artistRecord) {
      if (silent) return;
      throw new NotFoundException('Entity not found in favorites');
    }
    return this.favoritesRepo.remove(artistRecord);
  }

  async removeAlbum(albumId: string, silent = false) {
    const albumRecord = await this.favoritesRepo.findOneBy({
      contentId: albumId,
    });
    if (!albumRecord) {
      if (silent) return;
      throw new NotFoundException('Entity not found in favorites');
    }
    return this.favoritesRepo.remove(albumRecord);
  }

  async removeTrack(contentId: string, silent = false) {
    const trackRecord = await this.favoritesRepo.findOneBy({
      contentId,
    });
    if (!trackRecord) {
      if (silent) return;
      throw new NotFoundException('Entity not found in favorites');
    }
    return this.favoritesRepo.remove(trackRecord);
  }
}
