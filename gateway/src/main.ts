import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3069;

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? PORT);
}
await bootstrap();
