import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@UseInterceptors(ClassSerializerInterceptor)
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
  async getArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    return album;
  }

  @Put('/:id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumService.update(id, body);
    return album;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const deletedAlbumId = await this.albumService.delete(id);
    return deletedAlbumId;
  }
}
