import { NestFactory } from '@nestjs/core';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { AppModule } from './app.module';

process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';

initializeApp({
  credential: applicationDefault(),
  projectId: 'wakafyuk-102a0',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
