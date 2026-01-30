import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Scene } from './scene.entity';
import { Song } from './song.entity';
import { LicensingStatus } from './licensing-status.enum';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  startTime: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  endTime: number;

  @Column({
    type: 'enum',
    enum: LicensingStatus,
    default: LicensingStatus.PENDING,
  })
  licensingStatus: LicensingStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Scene, (scene) => scene.tracks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sceneId' })
  scene: Scene;

  @Column()
  sceneId: string;

  @ManyToOne(() => Song, (song) => song.tracks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'songId' })
  song: Song;

  @Column()
  songId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
