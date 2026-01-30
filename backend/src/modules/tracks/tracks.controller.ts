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
import { TracksService } from './tracks.service';
import {
  CreateTrackDto,
  UpdateTrackDto,
  UpdateLicensingStatusDto,
} from '../../dto/track.dto';
import { TracksGateway } from './tracks.gateway';

@Controller('tracks')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly tracksGateway: TracksGateway,
  ) {}

  @Post()
  async create(@Body(ValidationPipe) createTrackDto: CreateTrackDto) {
    const track = await this.tracksService.create(createTrackDto);
    this.tracksGateway.notifyTrackCreated(track);
    return track;
  }

  @Get()
  findAll(@Query('sceneId') sceneId?: string, @Query('movieId') movieId?: string) {
    if (sceneId) {
      return this.tracksService.findByScene(sceneId);
    }
    if (movieId) {
      return this.tracksService.findByMovie(movieId);
    }
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.update(id, updateTrackDto);
    this.tracksGateway.notifyTrackUpdated(track);
    return track;
  }

  @Patch(':id/licensing-status')
  async updateLicensingStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) updateLicensingStatusDto: UpdateLicensingStatusDto,
  ) {
    const track = await this.tracksService.updateLicensingStatus(
      id,
      updateLicensingStatusDto,
    );
    this.tracksGateway.notifyLicensingStatusUpdated(track);
    return track;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tracksService.remove(id);
    this.tracksGateway.notifyTrackDeleted(id);
  }
}
