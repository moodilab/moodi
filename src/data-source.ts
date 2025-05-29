// src/data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Mood } from './mood/mood.entity'; // <- 추가

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
});
