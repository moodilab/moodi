import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';       // ← 추가
import { User } from '../user/user.entity';           // ← User 엔티티 import



@Module({
    imports: [
    TypeOrmModule.forFeature([User]),                // ← 여기에 등록
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
