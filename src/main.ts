import { HttpExceptionFilter, ResponseInterceptor } from '@app/common';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { Logger as PinoLogger } from 'nestjs-pino';
import { version } from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  app.setGlobalPrefix('v1', { exclude: ['/'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useLogger(app.get(PinoLogger));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  await app.listen(port);

  new Logger().log(
    `Application version ${version} is listening on port ${port}`,
  );
}
bootstrap();

function setupSwagger(app: INestApplication<any>) {
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Pinang Connect Dashboard Internal API Docs')
    .setDescription('The Pinang Connect Dashboard Internal API documentation')
    .setVersion(version)
    .addTag('PNC')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
