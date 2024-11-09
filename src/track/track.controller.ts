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
  async getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findById(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }

  @Put('/:id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.trackService.update(id, body);
    return track;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const deletedTrackId = await this.trackService.delete(id);
    return deletedTrackId;
  }
}
