import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getSwaggerCustomOptions, getSwaggerOptions } from './Utils/Swagger';
import 'colors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Test')
    .setDescription('API for test task application')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('api', app, document, getSwaggerCustomOptions());
  app.enableCors();
  await app.listen('3000', '0.0.0.0');
  console.log(`server started on ${await app.getUrl()}/api`);
}
bootstrap();
