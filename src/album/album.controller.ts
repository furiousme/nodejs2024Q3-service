import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dtos/create-album.dto';
import * as uuid from 'uuid';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async createAlbum(@Body() body: CreateAlbumDto): Promise<Album> {
    const album = await this.albumService.create(
      body.name,
      body.year,
      body.artistId,
    );
    return album;
  }

  @Get()
  async getArtists() {
    const albums = await this.albumService.findAll();
    return albums;
  }

  @Get('/:id')
  async getArtistById(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const album = await this.albumService.findById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    return album;
  }

  @Put('/:id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const album = await this.albumService.update(id, body);
    return album;
  }

  @Delete('/:id')
  async deleteAlbum(@Param('id') id: string): Promise<string> {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const deletedAlbumId = await this.albumService.delete(id);
    return deletedAlbumId;
  }
}
