import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './modules/movies/movies.module';
import { ScenesModule } from './modules/scenes/scenes.module';
import { SongsModule } from './modules/songs/songs.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { Movie } from './entities/movie.entity';
import { Scene } from './entities/scene.entity';
import { Song } from './entities/song.entity';
import { Track } from './entities/track.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'music_licensing',
      entities: [Movie, Scene, Song, Track],
      synchronize: true, // Set to false in production
      logging: process.env.NODE_ENV === 'development',
    }),
    MoviesModule,
    ScenesModule,
    SongsModule,
    TracksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
