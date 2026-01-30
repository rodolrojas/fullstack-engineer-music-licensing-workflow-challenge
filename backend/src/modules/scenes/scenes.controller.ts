import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { CreateSceneDto, UpdateSceneDto } from '../../dto/scene.dto';
import { ScenesGateway } from './scenes.gateway';

@Controller('scenes')
export class ScenesController {
  constructor(
    private readonly scenesService: ScenesService,
    private readonly scenesGateway: ScenesGateway,
  ) {}

  @Post()
  async create(@Body(ValidationPipe) createSceneDto: CreateSceneDto) {
    const scene = await this.scenesService.create(createSceneDto);
    this.scenesGateway.notifySceneCreated(scene);
    return scene;
  }

  @Get()
  findAll(@Query('movieId') movieId?: string) {
    if (movieId) {
      return this.scenesService.findByMovie(movieId);
    }
    return this.scenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scenesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSceneDto: UpdateSceneDto,
  ) {
    const scene = await this.scenesService.update(id, updateSceneDto);
    this.scenesGateway.notifySceneUpdated(scene);
    return scene;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scenesService.remove(id);
  }
}
