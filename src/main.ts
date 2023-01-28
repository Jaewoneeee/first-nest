import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사용 파이프
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 선언하지 않은 다른녀석이 validator에 접근하지 못하도록
    forbidNonWhitelisted: true,// 누군가 이상한 걸 보내면, 리퀘스트 자체를 차단
    transform: true, // 예를들어 여기있는 유저들이 보낸 거를 우리가 원하는 실제 타입으로 변환해줌
  }))
  await app.listen(3000);
}
bootstrap();
