import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scene } from '../../entities/scene.entity';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';
import { ScenesGateway } from './scenes.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Scene])],
  controllers: [ScenesController],
  providers: [ScenesService, ScenesGateway],
  exports: [ScenesService],
})
export class ScenesModule {}
