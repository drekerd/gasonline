import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(
    // credentials: true,
    {
      origin: true,
      methods: ['POST', 'PUT', 'DELETE', 'GET'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  );
  await app.listen(3008);
}
bootstrap();
