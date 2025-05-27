import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoAuthDto } from './dto/kakao-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // GET /auth/health
  @Get('health')
  health(): string {
    return 'Auth 모듈 작동 중';
  }

  // POST /auth/kakao
  // src/auth/auth.controller.ts
  @Post('kakao')
  async loginKakao(@Body() dto: KakaoAuthDto) {
    try {
      return await this.authService.loginWithKakao(dto.accessToken);
    } catch (err) {
      console.error('loginWithKakao error:', err);
      throw err;
    }
  }
}