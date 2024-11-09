import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dtos/create-track.dto';
import { Track } from './track.entity';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepo: TrackRepository,
    private readonly favoritesService: FavoritesService,
  ) {}

  create({
    name,
    albumId,
    artistId,
    duration,
  }: CreateTrackDto): Promise<Track> {
    return this.trackRepo.create({
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    });
  }

  findAll(): Promise<Track[]> {
    return this.trackRepo.findAll();
  }

  findById(id: string): Promise<Track> {
    return this.trackRepo.findById(id);
  }

  async update(id: string, attrs: Partial<UpdateTrackDto>): Promise<Track> {
    const track = await this.findById(id);
    if (!track) throw new NotFoundException('Track not found');

    const updatedTrack = new Track({
      ...track,
      ...attrs,
      updated_at: new Date().toISOString(),
      version: track.version + 1,
    });

    return this.trackRepo.update(id, updatedTrack);
  }

  async delete(id: string): Promise<string> {
    const track = await this.findById(id);
    if (!track) throw new NotFoundException('Track not found');
    await this.favoritesService.removeTrack(id);
    return this.trackRepo.delete(id);
  }

  async removeArtistReference(artistId: string) {
    return this.trackRepo.removeArtistReference(artistId);
  }

  async removeAlbumReference(albumId: string) {
    return this.trackRepo.removeAlbumReference(albumId);
  }
}
