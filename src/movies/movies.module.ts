import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService] 
    // 여기 있는 모든 것들을 import해서 타입을 추가하는 것만으로 잘 작동함
    // 이걸 dependency injection이라고 부름 
    // provider가 service를 import해오고 controller에 inject(주입)
})
export class MoviesModule {}
