import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    // GET /auth/health
    @Get('health')
    health(): string {
      return 'Auth 모듈 작동 중';
    }
}