import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { versionProject } from 'src/app.version';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  const showSwagger = configService.get('SWAGGER_SHOW');
  if (showSwagger) {
    const config = new DocumentBuilder()
      .setTitle('Simple Panorama do Governo API')
      .setDescription('')
      .setVersion(versionProject())
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
    logger.log('Swagger Inicialized');
  }
  await app.listen(3000);
}
bootstrap();
