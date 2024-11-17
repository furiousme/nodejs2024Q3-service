import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { Artist } from 'src/artist/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Artist]),
  ],
  exports: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
