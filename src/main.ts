import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { LogInterceptor } from './interceptors/log.interceptor'

/**
 * Configurações do funcionamento da api
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LogInterceptor())
  await app.listen(process.env.API_PORT);
}
bootstrap();
