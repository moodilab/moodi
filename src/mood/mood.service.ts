import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Mood } from './mood.entity';
import { CreateMoodDto } from './dto/create-mood.dto';

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(Mood)
    private readonly moodRepo: Repository<Mood>,
  ) {}

  /** 1) 오늘의 감정+일기 저장 */
  async createMood(
    userId: number,
    dto: CreateMoodDto,
  ): Promise<Mood> {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const mood = this.moodRepo.create({
      user: { id: userId } as any,
      date: today,
      emotion: dto.emotion,
      text: dto.text,
    });
    return this.moodRepo.save(mood);
  }

  /** 2) 월별 리스트 조회 */
  async getMoodsByMonth(
    userId: number,
    month: string,  // "YYYY-MM"
  ): Promise<{ id: number; date: string; emotion: string }[]> {
    const [year, mon] = month.split('-').map(Number);
    const start = new Date(year, mon - 1, 1).toISOString().slice(0, 10);
    const end = new Date(year, mon, 0).toISOString().slice(0, 10);

    const moods = await this.moodRepo.find({
      where: {
        user: { id: userId } as any,
        date: Between(start, end),
      },
      order: { date: 'ASC' },
    });
    return moods.map((m) => ({
      id: m.id,
      date: m.date,
      emotion: m.emotion,
    }));
  }

  /** 3) 개별 일자 상세 조회 */
  async getMoodById(
    userId: number,
    id: number,
  ): Promise<Mood> {
    const mood = await this.moodRepo.findOne({
      where: { id, user: { id: userId } as any },
    });
    if (!mood) {
      throw new NotFoundException('Record not found');
    }
    return mood;
  }
}
