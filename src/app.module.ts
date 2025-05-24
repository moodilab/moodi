import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoodModule } from './mood/mood.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
        ConfigModule.forRoot({ isGlobal: true }),

// src/app.module.ts
TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => {
    const url = config.get<string>('DATABASE_URL');
    console.log('🔌 DATABASE_URL=', url);
    return {
      type: 'postgres',
      url,
      ssl: { rejectUnauthorized: false },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  },
  inject: [ConfigService],
}),


        AuthModule,
        UserModule,
        MoodModule,
        ReportModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
