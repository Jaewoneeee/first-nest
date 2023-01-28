import { IsNumber, IsOptional, IsString } from 'class-validator';

export class createMovieDto{
    // 인풋값 하나하나에 유효성검사를 할 수 있게끔 해줌
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;
    @IsOptional()
    @IsString({each: true}) // each : 모든 요소를 하나씩 검사
    readonly genres: string[];
}
