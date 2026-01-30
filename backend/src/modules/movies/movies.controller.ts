import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from '../../dto/movie.dto';
import { MoviesGateway } from './movies.gateway';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly moviesGateway: MoviesGateway,
  ) {}

  @Post()
  async create(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
    const movie = await this.moviesService.create(createMovieDto);
    this.moviesGateway.notifyMovieCreated(movie);
    return movie;
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
  ) {
    const movie = await this.moviesService.update(id, updateMovieDto);
    this.moviesGateway.notifyMovieUpdated(movie);
    return movie;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
