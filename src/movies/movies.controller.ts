import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { createMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entities';
import { MoviesService } from './movies.service';

@Controller('movies') // 여기서 엔드포인트 url을 컨트롤함
export class MoviesController { // url을 mapping하는 역할
                                // moviesService란 프로퍼티를 만들고 타입을 지정해줬기 때문에 사용가능
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    // 무조건 :id 위에 있어야함! 그렇지 않으면 search를 그냥 id로 인식함
    @Get("search")
    search(@Query("year") searchingYear: string){
        return `searching for a movie made after ${searchingYear}`
    }

    @Get(":id") // 여기 id랑 바로밑 id는 같아야함
    getOne(@Param('id') movieId: number): Movie{ //원래는 movieId가 string값으로 넘어오는데, ValidationPipe의 transform으로 인해 number로 바꿔줌.
        return this.moviesService.getOne(movieId)
    }

    @Post("")
    create(@Body() movieData: createMovieDto){ 
        // console.log(movieData)
        
        return this.moviesService.createMovie(movieData);
    }

    @Delete(":id")
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    // Put : 모든 리소스를 업데이트
    // Patch : 리소스의 일부분만 업데이트
    @Patch(":id")
    patch(@Param("id") movieId: number, @Body() updateData: updateMovieDto){
        // return {
        //     updatedMoive: movieId,
        //     ...updateData 
        // }
        return this.moviesService.update(movieId, updateData);
    }

}
