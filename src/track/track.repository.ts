import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { Track } from './track.entity';
import { CreateTrackDto } from './dtos/create-track.dto';

@Injectable()
export class TrackRepository {
  private tracks = [];

  async create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const id = crypto.randomUUID();
    const now = new Date().getTime();
    const newTrack = new Track({
      id,
      name,
      artistId: artistId,
      albumId: albumId,
      duration,
      version: 1,
      createdAt: now,
      updatedAt: now,
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

  async removeArtistReference(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  async removeAlbumReference(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
