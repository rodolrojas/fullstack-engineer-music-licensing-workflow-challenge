import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class CreateSceneDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  sceneNumber: number;

  @IsUUID()
  movieId: string;
}

export class UpdateSceneDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  sceneNumber?: number;
}
