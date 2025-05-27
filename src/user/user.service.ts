// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

    /** 모든 사용자 조회 (테스트용) */
  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
  // ...

  async findOrCreateSocial(dto: {
    provider: string;
    providerId: string;
    nickname: string;
  }): Promise<User> {
    const column = dto.provider === 'kakao' ? 'kakaoId' : 'appleId';

    // 1) 기존 사용자 조회
    const existing = await this.userRepo.findOne({
      where: { [column]: dto.providerId },
    });
    if (existing) {
      return existing;
    }

    // 2) 신규 생성용 객체 (DeepPartial<User> 타입)
    const toCreate: DeepPartial<User> = {
      [column]: dto.providerId,
      nickname: dto.nickname,
    };
    // create() 대신 repository.save() 에 바로 넘겨도 됩니다:
    // const saved = await this.userRepo.save(toCreate);

    // 3) 저장 (단일 엔티티 오버로드 선택)
    const saved: User = await this.userRepo.save(toCreate);

    return saved;
  }
}
