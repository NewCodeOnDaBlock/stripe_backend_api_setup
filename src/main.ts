import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mikroOrmConfig from 'mikro-orm.config';
import { MikroORM } from '@mikro-orm/mysql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  const orm = await MikroORM.init(mikroOrmConfig);
  const generator = await orm.getSchemaGenerator();
  await generator.updateSchema();
  app.enableCors({
    origin: true, // Allow all origins, for now
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP Methods
    allowedHeaders: 'Content-Type, Accept', // Allowed HTTP Headers
    credentials: true, // Allows sessions/cookies to be sent
  });
  await app.listen(3000);
}
bootstrap();
