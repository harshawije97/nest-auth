import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/http-exception-filter.common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  // setup global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // api documentation
  const config = new DocumentBuilder()
    .setTitle('Nest Auth API')
    .setDescription('Complete authentication system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const apiDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, apiDoc);

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}/api`);
  console.log(
    `Swagger documentation is running on: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
