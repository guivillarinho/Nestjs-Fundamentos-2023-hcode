import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Configurações do funcionamento da api
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
