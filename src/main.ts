import { NestFactory } from '@nestjs/core';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { AppModule } from './app.module';

process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

initializeApp({
  credential: applicationDefault(),
  projectId: 'wakafyuk-102a0',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
