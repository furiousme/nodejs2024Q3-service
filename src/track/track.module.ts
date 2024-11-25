import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Track]),
    LoggingModule,
  ],
})
export class TrackModule {}
