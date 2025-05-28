import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Mood } from '../mood/mood.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Mood)
    private readonly moodRepo: Repository<Mood>,
  ) {}

  /**
   * 최근 7일(오늘 포함) 동안의 감정별 기록 수를 집계합니다.
   */
  async getWeeklyReport(userId: number): Promise<
    { emotion: Mood['emotion']; count: number }[]
  > {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 6); // 7일간

    const moods = await this.moodRepo.find({
      where: {
        user: { id: userId } as any,
        date: Between(
          start.toISOString().slice(0, 10),
          today.toISOString().slice(0, 10),
        ),
      },
    });

    // 감정별 카운트 집계
    const summary = moods.reduce((acc, m) => {
      acc[m.emotion] = (acc[m.emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // DB에 없는 감정도 0으로 채워서 반환
    const emotions: Mood['emotion'][] = [
      'happy','sad','angry','fear','surprise','disgust',
    ];
    return emotions.map((e) => ({
      emotion: e,
      count: summary[e] || 0,
    }));
  }
}
