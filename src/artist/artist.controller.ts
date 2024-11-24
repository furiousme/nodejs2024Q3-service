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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  artistNotFoundResponseExample,
  artistResponseExample,
  invalidIdResponseExample,
} from 'src/response-examples';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  /**
   *
   * Create artist
   */
  @ApiCreatedResponse({
    type: Artist,
    description: 'The artist has been created',
    example: artistResponseExample,
  })
  @ApiBody({ type: CreateArtistDto })
  @Post()
  async createArtist(@Body() body: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistService.create(body.name, body.grammy);
    return artist;
  }

  /**
   *
   * Get all artists
   */
  @ApiOkResponse({
    description: 'List all users',
    example: [artistResponseExample],
  })
  @Get()
  async getArtists() {
    const artists = await this.artistService.findAll();
    return artists;
  }

  /**
   *
   * Get artist by id
   */
  @ApiOkResponse({
    type: Artist,
    description: 'Get artist by id',
    example: artistResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
    example: artistNotFoundResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @Get('/:id')
  async getArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findById(id);
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);
    return artist;
  }

  /**
   *
   * Update artist
   */
  @ApiOkResponse({
    type: Artist,
    description: 'Artist updated',
    example: artistResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
    example: artistNotFoundResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiBody({ type: UpdateArtistDto })
  @Put('/:id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistService.update(id, body);
    return artist;
  }

  /**
   *
   * Delete artist
   */
  @ApiNoContentResponse({ description: 'Artist deleted' })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
    example: artistNotFoundResponseExample,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    await this.artistService.delete(id);
    return id;
  }
}
