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
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => ({
            type: 'postgres',
            url: config.get<string>('DATABASE_URL'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,  // 개발 중에만 true. 배포 전에는 false 권장
          }),
          inject: [ConfigService],
        }),
        
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
