import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepository } from './album.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService, AlbumRepository],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Album]),
  ],
})
export class AlbumModule {}
