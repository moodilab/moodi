// src/mood/dto/update-mood.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateMoodDto {
  @IsOptional()
  @IsString()
  content?: string;
}
