import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  album?: string;

  @IsOptional()
  @IsInt()
  durationSeconds?: number;

  @IsOptional()
  @IsString()
  rightsHolder?: string;
}

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  album?: string;

  @IsOptional()
  @IsInt()
  durationSeconds?: number;

  @IsOptional()
  @IsString()
  rightsHolder?: string;
}
