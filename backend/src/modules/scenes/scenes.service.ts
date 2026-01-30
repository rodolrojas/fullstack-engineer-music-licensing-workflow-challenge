import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scene } from '../../entities/scene.entity';
import { CreateSceneDto, UpdateSceneDto } from '../../dto/scene.dto';

@Injectable()
export class ScenesService {
  constructor(
    @InjectRepository(Scene)
    private sceneRepository: Repository<Scene>,
  ) {}

  async create(createSceneDto: CreateSceneDto): Promise<Scene> {
    return this.sceneRepository.save(createSceneDto);
  }

  async findAll(): Promise<Scene[]> {
    return this.sceneRepository.find({
      relations: ['movie', 'tracks', 'tracks.song'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByMovie(movieId: string): Promise<Scene[]> {
    return this.sceneRepository.find({
      where: { movieId },
      relations: ['tracks', 'tracks.song'],
      order: { sceneNumber: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Scene> {
    const scene = await this.sceneRepository.findOne({
      where: { id },
      relations: ['movie', 'tracks', 'tracks.song'],
    });

    if (!scene) {
      throw new NotFoundException(`Scene with ID ${id} not found`);
    }

    return scene;
  }

  async update(id: string, updateSceneDto: UpdateSceneDto): Promise<Scene> {
    const scene = await this.findOne(id);
    Object.assign(scene, updateSceneDto);
    return this.sceneRepository.save(scene);
  }

  async remove(id: string): Promise<void> {
    const scene = await this.findOne(id);
    await this.sceneRepository.remove(scene);
  }
}
