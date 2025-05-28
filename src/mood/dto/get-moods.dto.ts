import { IsNotEmpty, Matches } from 'class-validator';

export class GetMoodsDto {
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}$/, {
    message: 'month must be in YYYY-MM format',
  })
  month: string;  // ex: "2025-05"
}
