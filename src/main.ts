import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { LoggingMiddleware } from './logging/logging.middleware';
// import * as fs from 'node:fs';
// import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const config = app.get(ConfigService);

  const docConfig = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription('Home Library Service')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, documentFactory);

  // if (config.get('NODE_ENV') === 'development') {
  //   console.log('Write file....');
  //   try {
  //     fs.writeFileSync(
  //       path.resolve(__dirname, '../doc/api.json'),
  //       JSON.stringify(documentFactory(), null, 2),
  //       { flag: 'w+' },
  //     );
  //   } catch (e) {
  //     console.log('Error writing file', e);
  //   }
  // }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // app.useGlobalFilters(new HttpExceptionFilter(app.get(LoggingService)));

  await app.listen(config.get('port')).then(() => {
    console.log(`Server started on port ${config.get('port')}`);
  });
}
bootstrap();
