import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('> NODE_ENV=', process.env.NODE_ENV);
console.log('> DATABASE_URL=', process.env.DATABASE_URL);


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
