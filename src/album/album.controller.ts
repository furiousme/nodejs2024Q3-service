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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  albumNotFoundResponseExample,
  albumResponseExample,
  invalidIdResponseExample,
} from 'src/response-examples';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  /**
   *
   * Create album
   */
  @ApiCreatedResponse({
    type: Album,
    description: 'The album has been created',
    example: albumResponseExample,
  })
  @ApiBody({ type: CreateAlbumDto })
  @Post()
  async createAlbum(@Body() body: CreateAlbumDto): Promise<Album> {
    const album = await this.albumService.create(
      body.name,
      body.year,
      body.artistId,
    );
    return album;
  }

  /**
   *
   * get list of albums
   */
  @ApiOkResponse({
    type: [Album],
    description: 'The list of albums has been returned',
    example: [albumResponseExample],
  })
  @Get()
  async getAlbums() {
    const albums = await this.albumService.findAll();
    return albums;
  }

  /**
   *
   * Get album by id
   */
  @ApiOkResponse({
    type: Album,
    description: 'Get album by id',
    example: albumResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
    example: albumNotFoundResponseExample,
  })
  @Get('/:id')
  async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    return album;
  }

  /**
   *
   * Update album
   */
  @ApiOkResponse({
    type: Album,
    description: 'The album has been updated',
    example: albumResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
    example: albumNotFoundResponseExample,
  })
  @ApiBody({ type: UpdateAlbumDto })
  @Put('/:id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumService.update(id, body);
    return album;
  }

  /**
   *
   * Delete album
   */
  @ApiNoContentResponse({ description: 'Album deleted' })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Album not found',
    example: albumNotFoundResponseExample,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const deletedAlbumId = await this.albumService.delete(id);
    return deletedAlbumId;
  }
}
