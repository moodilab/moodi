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


@Module({
  imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        TypeOrmModule.forRootAsync({
            useFactory: (cs: ConfigService) => ({
    type: 'postgres',
    url: cs.get<string>('DATABASE_URL'),
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    // ← 아래 줄은 제거!
    // envFilePath: '.env',
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
