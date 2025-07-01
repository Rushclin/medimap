import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  app.use(json({ limit: '50mb' }));

  const port = process.env['PORT'] ?? 8080;
  await app.listen(port, '0.0.0.0');

  Logger.log(
    `🚀 Application is running on http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
