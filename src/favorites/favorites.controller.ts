import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  entityAddedResponseExample,
  favoritesNotFoundResponseExample,
  favoritesResponseExample,
  invalidIdResponseExample,
} from 'src/response-examples';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  /**
   *
   * Get all favorite records
   */
  @ApiOkResponse({
    description: 'Get all favorites',
    example: favoritesResponseExample,
  })
  @Get()
  async getAll() {
    const favorites = await this.favoritesService.getAll();
    return favorites;
  }

  /**
   *
   * Add artist to favorites
   */
  @ApiCreatedResponse({
    description: 'Add artist to favorites',
    example: entityAddedResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Entity with this id not found',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const favoriteRecordId = await this.favoritesService.addArtist(id);
    return favoriteRecordId;
  }

  /**
   *
   * Add album to favorites
   */
  @ApiCreatedResponse({
    description: 'Add album to favorites',
    example: entityAddedResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Entity with this id not found',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const favoriteRecordId = await this.favoritesService.addAlbum(id);
    return favoriteRecordId;
  }

  /**
   *
   * Add track to favorites
   */
  @ApiCreatedResponse({
    description: 'Add track to favorites',
    example: entityAddedResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Entity with this id not found',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const favoriteRecordId = await this.favoritesService.addTrack(id);
    return favoriteRecordId;
  }

  /**
   *
   * Delete artist from favorites
   */
  @ApiNoContentResponse({ description: 'Entity was deleted from favorites' })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Entity with this id not found in favorites',
    example: favoritesNotFoundResponseExample,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedArtistId = await this.favoritesService.removeArtist(id);
    return removedArtistId;
  }

  /**
   *
   * Delete album from favorites
   */
  @ApiNoContentResponse({ description: 'Entity was deleted from favorites' })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Entity with this id not found in favorites',
    example: favoritesNotFoundResponseExample,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedAlbumId = await this.favoritesService.removeAlbum(id);
    return removedAlbumId;
  }

  /**
   *
   * Delete track from favorites
   */
  @ApiNoContentResponse({ description: 'Entity was deleted from favorites' })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Entity with this id not found in favorites',
    example: favoritesNotFoundResponseExample,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedTrackId = await this.favoritesService.removeTrack(id);
    return removedTrackId;
  }
}
