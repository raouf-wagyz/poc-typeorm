import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('poc-typeorm')
    .setDescription("Typeorm POC")
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      displayOperationId: true,
      docExpansion: 'none',
      filter: true,
      operationsSorter: 'method',
      tagsSorter: 'alpha',
    },
  });
}

// NESTJS
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initSwagger(app);
  await app.listen(5050);
}

bootstrap().catch((e) => {
  console.error(`Une erreur a eu lieu au démarrage du serveur ${e}`);
});
