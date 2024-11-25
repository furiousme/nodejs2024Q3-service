import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Album]),
    LoggingModule,
  ],
})
export class AlbumModule {}
