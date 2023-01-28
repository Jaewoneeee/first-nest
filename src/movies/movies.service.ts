import { Injectable, NotFoundException } from '@nestjs/common';
import { createMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entities';

// inject 해주는 거!
@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    
    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }
        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id); // 아하 getOne을 통과한다면 사실 문제가 없는거기때문에 예외처리를 여기서 한번 ㅇㅇ 
        this.movies = this.movies.filter(movie => movie.id !== id)
    }

    createMovie(movieData: createMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:number, updateData: updateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}