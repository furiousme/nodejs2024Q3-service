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
import { TrackService } from './track.service';
import { Track } from './track.entity';
import { CreateTrackDto } from './dtos/create-track.dto';
import * as uuid from 'uuid';
import { UpdateTrackDto } from './dtos/update-track.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

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

  @Get()
  async getTracks() {
    const tracks = await this.trackService.findAll();
    return tracks;
  }

  @Get('/:id')
  async getTrackById(@Param('id') id: string) {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const track = await this.trackService.findById(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }

  @Put('/:id')
  async updateTrack(
    @Param('id') id: string,
    @Body() body: UpdateTrackDto,
  ): Promise<Track> {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const track = await this.trackService.update(id, body);
    return track;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteTrack(@Param('id') id: string): Promise<string> {
    if (!uuid.validate(id)) throw new BadRequestException(`Invalid id ${id}`);
    const deletedTrackId = await this.trackService.delete(id);
    return deletedTrackId;
  }
}
