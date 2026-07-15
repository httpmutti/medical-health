import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('port') ?? 3000;
  const apiPrefix = config.get<string>('apiPrefix') ?? 'api/v1';
  const nodeEnv = config.get<string>('nodeEnv') ?? 'development';

  // Security headers
  app.use(helmet());

  // CORS — tighten origins in production
  app.enableCors({
    origin: nodeEnv === 'production' ? false : '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global route prefix: all routes are /api/v1/...
  app.setGlobalPrefix(apiPrefix);

  // Graceful shutdown
  app.enableShutdownHooks();

  await app.listen(port);
  console.log(`\n🚀  Server running on http://localhost:${port}/${apiPrefix}`);
  console.log(`❤️   Health check: http://localhost:${port}/${apiPrefix}/health\n`);
}

bootstrap();
