// src/main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser'; // ← Import body-parser explicitly
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // === Increase JSON and URL-encoded payload limits ===
  // Default is 100kb — we increase to 10MB to support large base64 images
  app.use(bodyParser.json({ limit: '80mb' }));
  app.use(bodyParser.urlencoded({ limit: '80mb', extended: true }));

  // === CORS Configuration ===
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // === Serve static files from uploads folder ===
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3002);
  console.log('🚀 Backend running on http://localhost:3002');
}
bootstrap();