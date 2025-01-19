// ** Nestjs
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// ** Types
import { ConfigInterface } from './config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type, Authorization, x-site-id, x-client-device,x-client-ip ',
  });

  const configService = app.get<ConfigService<ConfigInterface>>(ConfigService);

  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // ** Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Blog Management System')
    .setDescription('Official documentation of BMS')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', bearerFormat: 'JWT', scheme: 'bearer' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // ** Server running on port
  await app.listen(configService.get('PORT'), () => {
    console.log(`BMS Server started on port: ${configService.get('PORT')}`);
  });
}
bootstrap();
