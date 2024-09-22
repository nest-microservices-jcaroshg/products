import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { env } from './config/env';

async function bootstrap() {
  const logger: Logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: env.PORT,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // await app.listen(env.PORT);
  // logger.log(`Micro Service <Products> is working on port: ${env.PORT}`);
  logger.log(`Products Micro Service <Products> running on port: ${env.PORT}`);
}
bootstrap();
