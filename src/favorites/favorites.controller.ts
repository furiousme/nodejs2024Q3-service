import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import * as uuid from 'uuid';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    const favorites = await this.favoritesService.getAll();
    return favorites;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  async addArtist(@Param('id') id: string): Promise<string> {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const addedArtistId = await this.favoritesService.addArtist(id);
    return addedArtistId;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const addedAlbumId = await this.favoritesService.addAlbum(id);
    return addedAlbumId;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const addedTrackId = await this.favoritesService.addTrack(id);
    return addedTrackId;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const removedArtistId = await this.favoritesService.removeArtist(id);
    return removedArtistId;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const removedAlbumId = await this.favoritesService.removeAlbum(id);
    return removedAlbumId;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeTrack(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const removedTrackId = await this.favoritesService.removeTrack(id);
    return removedTrackId;
  }
}
