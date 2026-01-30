import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../../entities/track.entity';
import {
  CreateTrackDto,
  UpdateTrackDto,
  UpdateLicensingStatusDto,
} from '../../dto/track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackRepository.save(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find({
      relations: ['scene', 'scene.movie', 'song'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByScene(sceneId: string): Promise<Track[]> {
    return this.trackRepository.find({
      where: { sceneId },
      relations: ['song'],
      order: { startTime: 'ASC' },
    });
  }

  async findByMovie(movieId: string): Promise<Track[]> {
    return this.trackRepository
      .createQueryBuilder('track')
      .leftJoinAndSelect('track.song', 'song')
      .leftJoinAndSelect('track.scene', 'scene')
      .leftJoinAndSelect('scene.movie', 'movie')
      .where('movie.id = :movieId', { movieId })
      .orderBy('scene.sceneNumber', 'ASC')
      .addOrderBy('track.startTime', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({
      where: { id },
      relations: ['scene', 'scene.movie', 'song'],
    });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    Object.assign(track, updateTrackDto);
    return this.trackRepository.save(track);
  }

  async updateLicensingStatus(
    id: string,
    updateLicensingStatusDto: UpdateLicensingStatusDto,
  ): Promise<Track> {
    const track = await this.findOne(id);
    Object.assign(track, updateLicensingStatusDto);
    return this.trackRepository.save(track);
  }

  async remove(id: string): Promise<void> {
    const track = await this.findOne(id);
    await this.trackRepository.remove(track);
  }
}
