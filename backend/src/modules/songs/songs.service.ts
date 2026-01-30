import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../../entities/song.entity';
import { CreateSongDto, UpdateSongDto } from '../../dto/song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    return this.songRepository.save(createSongDto);
  }

  async findAll(): Promise<Song[]> {
    return this.songRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: { id },
      relations: ['tracks', 'tracks.scene', 'tracks.scene.movie'],
    });

    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.findOne(id);
    Object.assign(song, updateSongDto);
    return this.songRepository.save(song);
  }

  async remove(id: string): Promise<void> {
    const song = await this.findOne(id);
    await this.songRepository.remove(song);
  }
}
