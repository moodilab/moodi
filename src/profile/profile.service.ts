// src/profile/profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateProfileDto } from './DTO/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async setProfile(userId: number, dto: CreateProfileDto): Promise<void> {
    const result = await this.userRepo.update(userId, {
      mbti: dto.mbti,
      gender: dto.gender,
      ageGroup: dto.ageGroup,
    });
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async getProfile(userId: number): Promise<CreateProfileDto> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // 프로필이 미완성(필수 필드 missing) 상태라면 404로 처리
  if (!user.mbti || !user.gender || !user.ageGroup) {
    throw new NotFoundException('Profile not completed');
  }
    const { mbti, gender, ageGroup } = user;
    return { mbti, gender, ageGroup };
  }
}
