import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

    
  //beforeEach(async () => {
  // 매 테스트마다 어플레케이션을 생성함
  // 그러면 데이터베이스가 항상 텅텅 비게 되겠지
  // 그래서 아래를 beforeAll로 수정
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile(); 

    //테스트에서도 실제 어플리케이션의 환경을 그대로 적용시켜줘야 된다
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // 선언하지 않은 다른녀석이 validator에 접근하지 못하도록
      forbidNonWhitelisted: true,// 누군가 이상한 걸 보내면, 리퀘스트 자체를 차단
      transform: true, // 예를들어 여기있는 유저들이 보낸 거를 우리가 원하는 실제 타입으로 변환해줌
    }))
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my movie API');
  });

  describe("/movies", () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    })

    it('POST', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"test",
        year: 1234,
        genres: ["test"]
      })
      .expect(201)
    });
  
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
    });
  })

  describe('/movies/:id', () => {
    it('GET 200', () =>{
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200)
    })
    it('GET 404', () =>{
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404)
    })
    it('PATCH', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        year: 3030,
      })
      .expect(200)
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200)
    });
    
  })

});
