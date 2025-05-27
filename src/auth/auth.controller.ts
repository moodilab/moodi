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
  @Post('kakao')
  loginKakao(@Body() dto: KakaoAuthDto) {
    // dto.accessToken 을 AuthService 로 전달
    return this.authService.loginWithKakao(dto.accessToken);
  }
}