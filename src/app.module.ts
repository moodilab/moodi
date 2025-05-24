import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoodModule } from './mood/mood.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule,
        MoodModule,
        ReportModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
