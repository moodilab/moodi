// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // Authorization 헤더의 Bearer 토큰에서 JWT를 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 만료된 토큰도 거부
      ignoreExpiration: false,
      // secret 키는 환경변수에서 읽기
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // JWT 검증에 성공한 뒤 호출됩니다.
  // 여기서 payload.sub (user.id)로 사용자 존재 여부를 확인하고,
  // 리턴되는 객체가 req.user로 주입됩니다.
  async validate(payload: { sub: number }) {
    // 필요하다면 데이터베이스에서 사용자 조회 후 추가 검증
    return { id: payload.sub, userId: payload.sub };
  }
}