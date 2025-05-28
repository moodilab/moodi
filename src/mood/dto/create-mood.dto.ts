import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMoodDto {
  @IsNotEmpty()
  @IsEnum(['happy','sad','angry','fear','surprise','disgust'])
  emotion: 'happy' | 'sad' | 'angry' | 'fear' | 'surprise' | 'disgust';

  @IsOptional()
  @IsString()
  text?: string;
}
