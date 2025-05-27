// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithKakao(accessToken: string) {
    // 1) kakaoId 결정
    let kakaoId: string;
    let nickname = 'DevUser';

    if (process.env.NODE_ENV === 'development') {
      // 개발 모드: 토큰 자체를 고유 ID로 사용
      kakaoId = accessToken;
    } else {
      // 운영 모드: 실제 카카오 API 호출
      const response$ = this.httpService.get(
        'https://kapi.kakao.com/v2/user/me',
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const res = await lastValueFrom(response$).catch(() => {
        throw new UnauthorizedException('Invalid Kakao token');
      });

      kakaoId = res.data.id.toString();
      nickname = res.data.kakao_account.profile.nickname;
      // avatar 컬럼이 사라졌으니 더 이상 사용하지 않습니다
    }

    // 2) find-or-create (providerId: kakaoId)
    const user = await this.userService.findOrCreateSocial({
      provider: 'kakao',
      providerId: kakaoId,
      nickname,
    });

    // 3) JWT 발급
    const token = this.jwtService.sign({ sub: user.id });

    // 4) isProfileComplete 플래그 반환
    return {
      jwt: token,
      isProfileComplete: user.mbti != null,
    };
  }
}
