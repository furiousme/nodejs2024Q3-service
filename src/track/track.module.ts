import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService, TrackRepository],
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Track]),
  ],
})
export class TrackModule {}
