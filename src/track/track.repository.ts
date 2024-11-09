import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './track.entity';
import { CreateTrackDto } from './dtos/create-track.dto';

@Injectable()
export class TrackRepository {
  private tracks = [];

  async create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const id = uuidv4();
    const newTrack = new Track({
      id,
      name,
      artistId: artistId,
      albumId: albumId,
      duration,
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    this.tracks.push(newTrack);
    return this.findById(id);
  }

  async findAll() {
    return this.tracks;
  }

  async findById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  async update(id: string, track) {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);
    this.tracks[trackIndex] = { ...this.tracks[trackIndex], ...track };
    return this.tracks[trackIndex];
  }

  async delete(id: string) {
    const trackIndex = this.tracks.findIndex((t) => t.id === id);
    this.tracks.splice(trackIndex, 1);
    return id;
  }
}