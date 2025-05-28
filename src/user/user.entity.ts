// src/user/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Mood } from '../mood/mood.entity';  // ← 추가

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  kakaoId?: string;

  @Column({ nullable: true })
  appleId?: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  mbti?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  ageGroup?: string;

  @OneToMany(() => Mood, (mood) => mood.user)
  moods: Mood[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
