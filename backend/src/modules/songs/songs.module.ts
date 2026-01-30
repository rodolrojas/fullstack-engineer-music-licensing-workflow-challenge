import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../../entities/song.entity';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SongsGateway } from './songs.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongsService, SongsGateway],
  exports: [SongsService],
})
export class SongsModule {}
