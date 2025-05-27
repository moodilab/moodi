// src/data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
});
