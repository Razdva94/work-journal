import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';

function flattenErrors(
  errors: ValidationError[],
  parent = '',
): Array<{ property: string; constraints: Record<string, string> }> {
  const res: Array<{ property: string; constraints: Record<string, string> }> =
    [];
  for (const e of errors) {
    const path = parent
      ? e.property.match(/^\d+$/)
        ? `${parent}[${e.property}]`
        : `${parent}.${e.property}`
      : e.property;

    if (e.constraints && Object.keys(e.constraints).length) {
      res.push({ property: path, constraints: e.constraints });
    }
    if (e.children?.length) {
      res.push(...flattenErrors(e.children, path));
    }
  }
  return res;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigins = configService.get<string[]>('cors.origins') ?? [
    'http://localhost:5175',
    'http://127.0.0.1:5175',
  ];

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: flattenErrors(errors),
        }),
    }),
  );

  const port = configService.get<number>('port') ?? 3001;
  await app.listen(port);
}

void bootstrap();
