import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../../entities/track.entity';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksGateway } from './tracks.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService, TracksGateway],
  exports: [TracksService],
})
export class TracksModule {}
