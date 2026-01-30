import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsUUID,
  Min,
} from 'class-validator';
import { LicensingStatus } from '../entities/licensing-status.enum';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  startTime: number;

  @IsNumber()
  @Min(0)
  endTime: number;

  @IsUUID()
  sceneId: string;

  @IsUUID()
  songId: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  startTime?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  endTime?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateLicensingStatusDto {
  @IsEnum(LicensingStatus)
  licensingStatus: LicensingStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
