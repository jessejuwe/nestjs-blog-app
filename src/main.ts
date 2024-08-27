import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

/**
 * Bootstrap the application
 * @description Bootstrap the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Use validation pipes globally */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // Enable global pipes

  /** Enable CORS  */
  app.enableCors(); // Enable CORS

  /** Swagger configuration */
  const config = new DocumentBuilder()
    .setTitle('NestJS - Blog App API')
    .setDescription('Use this API to interact with a blog app')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3000')
    .build();

  /** Instantiate Swagger Document */
  const document = SwaggerModule.createDocument(app, config);

  /** Setup Swagger UI */
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
