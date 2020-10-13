import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/all.exception.filter';
import { MappingInterceptor } from './util/mapping.interceptor';
import { myLogger } from './util/my.func.middle';

initializeTransactionalContext(); // Initialize cls-hooked
patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const options = new DocumentBuilder()
    .setTitle('User Example')
    .setDescription('This is a sample nest practice')
    .setVersion('1.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 글로벌 미들웨어를 가장 먼저 탄다
  app.use(myLogger);

  // error handler
  app.useGlobalFilters(new AllExceptionsFilter());

  // success handler
  app.useGlobalInterceptors(new MappingInterceptor());

  await app.listen(8003);
}
bootstrap();
