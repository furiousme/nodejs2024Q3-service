import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dtos/create-track.dto';
import { Track } from './track.entity';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
    private readonly favoritesService: FavoritesService,
  ) {}

  create({
    name,
    albumId,
    artistId,
    duration,
  }: CreateTrackDto): Promise<Track> {
    const track = this.trackRepo.create({
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    });

    return this.trackRepo.save(track);
  }

  findAll(): Promise<Track[]> {
    return this.trackRepo.find();
  }

  findById(id: string): Promise<Track> {
    return this.trackRepo.findOneBy({ id });
  }

  async update(id: string, attrs: Partial<UpdateTrackDto>): Promise<Track> {
    const track = await this.findById(id);
    if (!track) throw new NotFoundException('Track not found');
    Object.assign(track, attrs);
    return this.trackRepo.save(track);
  }

  async delete(id: string): Promise<void> {
    const track = await this.findById(id);
    const silent = true;
    if (!track) throw new NotFoundException('Track not found');
    await this.favoritesService.removeTrack(id, silent);
    this.trackRepo.remove(track);
  }

  async removeArtistReference(artistId: string) {
    const tracks = await this.trackRepo.findBy({ artistId });
    const updatedTracks = tracks.map((track) => {
      track.artistId = null;
      return track;
    });
    await this.trackRepo.save(updatedTracks);
  }

  async removeAlbumReference(albumId: string) {
    const tracks = await this.trackRepo.findBy({ albumId });
    const updatedTracks = tracks.map((track) => {
      track.albumId = null;
      return track;
    });
    await this.trackRepo.save(updatedTracks);
  }
}
