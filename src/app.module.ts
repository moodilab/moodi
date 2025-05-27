import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoodModule } from './mood/mood.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionModule } from './version/version.module';
import { ProfileModule } from './profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => ({
            type: 'postgres',
            url: config.get<string>('DATABASE_URL'),
            ssl: { rejectUnauthorized: false },
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,  // 개발 중에만 true. 배포 전에는 false 권장
            envFilePath: '.env',   // 또는 ['./.env']

          }),
          inject: [ConfigService],
        }),

        AuthModule,
        UserModule,
        MoodModule,
        ReportModule,
        VersionModule,
        ProfileModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
