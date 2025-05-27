// src/profile/profile.controller.ts
import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
    ValidationPipe,
    UsePipes,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ProfileService } from './profile.service';
  import { CreateProfileDto } from './dto/create-profile.dto';
  
  @Controller('profile')
  @UseGuards(JwtAuthGuard) // JWT 인증 적용
  export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}
  
    // 프로필 저장
    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Request() req, @Body() dto: CreateProfileDto) {
      await this.profileService.setProfile(req.user.id, dto);
    }
  
    // 프로필 조회
    @Get()
    async find(@Request() req): Promise<CreateProfileDto> {
      return this.profileService.getProfile(req.user.id);
    }
  }
  