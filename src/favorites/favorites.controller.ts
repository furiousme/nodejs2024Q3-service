import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    const favorites = await this.favoritesService.getAll();
    return favorites;
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    const addedArtistId = await this.favoritesService.addArtist(id);
    return addedArtistId;
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    const addedAlbumId = await this.favoritesService.addAlbum(id);
    return addedAlbumId;
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    const addedTrackId = await this.favoritesService.addTrack(id);
    return addedTrackId;
  }

  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string) {
    const removedArtistId = await this.favoritesService.removeArtist(id);
    return removedArtistId;
  }

  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string) {
    const removedAlbumId = await this.favoritesService.removeAlbum(id);
    return removedAlbumId;
  }

  @Delete('track/:id')
  async removeTrack(@Param('id') id: string) {
    const removedTrackId = await this.favoritesService.removeTrack(id);
    return removedTrackId;
  }
}
