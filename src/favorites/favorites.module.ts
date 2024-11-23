import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { Artist } from 'src/artist/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/album/album.entity';
import { Track } from 'src/track/track.entity';
import { Favorites } from './favorites.enity';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Artist, Album, Track, Favorites]),
    LoggingModule,
  ],
  exports: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
