// src/user/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
