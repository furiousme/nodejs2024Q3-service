import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Artist]),
    LoggingModule,
  ],
})
export class ArtistModule {}
