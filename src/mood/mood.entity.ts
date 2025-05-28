import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('moods')
export class Mood {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.moods, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'date' })
  date: string;  // YYYY-MM-DD 형식

  @Column({ type: 'enum', enum: ['happy','sad','angry','fear','surprise','disgust'] })
  emotion: 'happy' | 'sad' | 'angry' | 'fear' | 'surprise' | 'disgust';

  @Column({ type: 'text', nullable: true })
  text?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
