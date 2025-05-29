import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { GetMoodsDto } from './dto/get-moods.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { Mood } from './mood.entity';


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

@Get('today')
  @HttpCode(HttpStatus.OK)
  async checkToday(@Request() req): Promise<{ exists: boolean }> {
    const exists = await this.moodService.hasMoodToday(req.user.id);
    return { exists };
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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMoodDto: UpdateMoodDto,
  ): Promise<Mood> {
    return this.moodService.update(id, updateMoodDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moodService.remove(id);
  }

}
