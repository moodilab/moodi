import {
  Controller,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportService } from './report.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  /** GET /reports/weekly */
  @Get('weekly')
  async weekly(@Request() req) {
    // req.user.id 에서 사용자 ID 추출
    return this.reportService.getWeeklyReport(req.user.id);
  }
}
