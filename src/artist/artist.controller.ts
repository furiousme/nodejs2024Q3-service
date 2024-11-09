import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dtos/artist.dto';
import * as uuid from 'uuid';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async createArtist(@Body() body: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistService.create(body.name, body.grammy);
    return artist;
  }

  @Get()
  async getArtists() {
    const artists = await this.artistService.findAll();
    return artists;
  }

  @Get('/:id')
  async getArtistById(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const artist = await this.artistService.findById(id);
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);
    return artist;
  }

  @Put('/:id')
  async updateArtist(
    @Param('id') id: string,
    @Body() body: UpdateArtistDto,
  ): Promise<Artist> {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const artist = await this.artistService.update(id, body);
    return artist;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteArtist(@Param('id') id: string): Promise<string> {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const deletedArtistId = await this.artistService.delete(id);
    return deletedArtistId;
  }
}
