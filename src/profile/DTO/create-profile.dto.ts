// src/profile/dto/create-profile.dto.ts
import { IsNotEmpty, IsIn, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([
    'INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
    'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP',
  ])
  mbti: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['male','female','other'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['10s','20s','30s','40s','50s','60s+'])
  ageGroup: string;
}
