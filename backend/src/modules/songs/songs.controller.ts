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
import { SongsService } from './songs.service';
import { CreateSongDto, UpdateSongDto } from '../../dto/song.dto';
import { SongsGateway } from './songs.gateway';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    private readonly songsGateway: SongsGateway,
  ) {}

  @Post()
  async create(@Body(ValidationPipe) createSongDto: CreateSongDto) {
    const song = await this.songsService.create(createSongDto);
    this.songsGateway.notifySongCreated(song);
    return song;
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSongDto: UpdateSongDto,
  ) {
    const song = await this.songsService.update(id, updateSongDto);
    this.songsGateway.notifySongUpdated(song);
    return song;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
