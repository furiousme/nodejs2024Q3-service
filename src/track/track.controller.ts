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
import { TrackService } from './track.service';
import { Track } from './track.entity';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  invalidIdResponseExample,
  trackBadRequestResponseExample,
  trackNotFoundResponseExample,
  trackResponseExample,
} from 'src/response-examples';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  /**
   *
   * Create track
   */
  @ApiCreatedResponse({
    type: Track,
    description: 'Track created',
    example: trackResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Body does not contain required fields',
    example: trackBadRequestResponseExample,
  })
  @ApiBody({ type: CreateTrackDto })
  @Post()
  async createTrack(@Body() body: CreateTrackDto): Promise<Track> {
    const track = await this.trackService.create({
      name: body.name,
      artistId: body.artistId,
      albumId: body.albumId,
      duration: body.duration,
    });
    return track;
  }

  /**
   *
   * Get all tracks
   */
  @ApiOkResponse({
    type: Track,
    description: 'List of all tracks',
    example: [trackResponseExample],
  })
  @Get()
  async getTracks() {
    const tracks = await this.trackService.findAll();
    return tracks;
  }

  /**
   *
   * Get tracks by id
   */
  @ApiOkResponse({
    type: Track,
    description: 'Get track by id',
    example: trackResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
    example: trackNotFoundResponseExample,
  })
  @Get('/:id')
  async getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findById(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }

  /**
   *
   * Update track
   */
  @ApiOkResponse({
    type: Track,
    description: 'Track updated',
    example: trackResponseExample,
  })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
    example: invalidIdResponseExample,
  })
  @ApiBody({ type: UpdateTrackDto })
  @Put('/:id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.trackService.update(id, body);
    return track;
  }

  /**
   *
   * Delete track
   */
  @ApiNoContentResponse({ description: 'Track deleted' })
  @ApiBadRequestResponse({
    description: 'Id is not valid uuid',
    example: invalidIdResponseExample,
  })
  @ApiNotFoundResponse({
    description: 'Track not found',
    example: invalidIdResponseExample,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const deletedTrackId = await this.trackService.delete(id);
    return deletedTrackId;
  }
}
