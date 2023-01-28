
import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { createMovieDto } from './create-movie.dto';
                                                // 베이스타입이 필요함
export class updateMovieDto extends PartialType(createMovieDto) {
    // // 인풋값 하나하나에 유효성검사를 할 수 있게끔 해줌
    // @IsString()
    // readonly title?: string;
    // @IsNumber()
    // readonly year?: number;
    // @IsString({each: true}) // each : 모든 요소를 하나씩 검사
    // readonly genres?: string[];
}
