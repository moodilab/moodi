import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {}

@Get('health')
health(): string {
  return 'Auth 모듈 작동 중';
}