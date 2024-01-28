import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true,
      transformOptions: { enableImplicitConversion: true }
    }),
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
  .setTitle("API TIPO DE CAMBIO")
  .setDescription("API para calcular el tipo de cambio utilizando las tecnologías: NestJS, Typescript, JWT, Redis, MySQL y Docker.")
  .setVersion("1.0")
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("",app,document)

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();