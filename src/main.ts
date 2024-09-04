import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';

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
      transformOptions: { enableImplicitConversion: true },
    }),
  ); // Enable global pipes

  /** Swagger configuration */
  const swaggerConfig = new DocumentBuilder()
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
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  /** Setup Swagger UI */
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  /** Enable CORS  */
  app.enableCors(); // Enable CORS

  /** Start the application */
  await app.listen(3000);
}

bootstrap();
