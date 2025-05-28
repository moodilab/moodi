import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { Mood } from '../mood/mood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mood])],  // ← Mood 엔티티 주입
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}