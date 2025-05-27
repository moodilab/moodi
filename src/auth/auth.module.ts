// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    HttpModule,                               // 1) 외부 OAuth API 호출
    PassportModule,                           // 2) Guard·Strategy 통합
    TypeOrmModule.forFeature([User]),         // 3) UserRepository 주입
    JwtModule.registerAsync({                 // 4) JWT 설정
      imports: [ConfigModule],                //    ConfigService 사용
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,     // 로그인 로직
    UserService,     // 사용자 조회·생성 로직
    JwtStrategy,     // JWT 검증 전략
  ],
  controllers: [AuthController],
})
export class AuthModule {}
