import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { GetMoodsDto } from './dto/get-moods.dto';

@UseGuards(JwtAuthGuard)
@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  /** 1) POST /moods */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() req,
    @Body(new ValidationPipe({ whitelist: true }))
    dto: CreateMoodDto,
  ) {
    return this.moodService.createMood(req.user.id, dto);
  }

  /** 2) GET /moods?month=YYYY-MM */
  @Get()
  async list(
    @Request() req,
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: GetMoodsDto,
  ) {
    return this.moodService.getMoodsByMonth(req.user.id, query.month);
  }

  /** 3) GET /moods/:id */
  @Get(':id')
  async detail(
    @Request() req,
    @Param('id') id: string,
  ) {
    return this.moodService.getMoodById(req.user.id, +id);
  }
}
