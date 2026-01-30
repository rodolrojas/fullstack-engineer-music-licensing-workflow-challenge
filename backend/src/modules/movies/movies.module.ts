import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../entities/movie.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesGateway } from './movies.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesGateway],
  exports: [MoviesService],
})
export class MoviesModule {}
