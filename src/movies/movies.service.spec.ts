import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { describe } from 'node:test';
import { MoviesService } from './movies.service';

// 묘사하다
describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트하기전
  // beforeAll, afterAll 등등 많은 Hook들이 있다
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // indivisual test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2+2).toEqual(4);
  });

  describe('getAll', () => {
    it('shoud return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  }) 

  describe('getOne', () => {
    it('sholud be return a movie', () =>{
      service.createMovie({
        title: 'test movie',
        year: 2020,
        genres: ['123'],
      })
      const movie = service.getOne(1)
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it('should throw 404 error', () => {
      try {
        service.getOne(999)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.")
      }
    })
  })

  describe('deletOne', () => {
    it('delete a movie', () => {
      service.createMovie({
        title: 'test movie',
        year: 2020,
        genres: ['123'],
      })
      // const allMovies = service.getAll()
      // service.deleteOne(1)
      // const afterDelete = service.getAll()
      // expect(afterDelete.length).toEqual(allMovies.length - 1)
      const allMovies = service.getAll().length
      service.deleteOne(1)
      const afterDelete = service.getAll().length
      expect(afterDelete).toBeLessThan(allMovies)
    })

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.")
      }
    })
  })

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length
      service.createMovie({
        title: 'test movie',
        year: 2020,
        genres: ['123'],
      })
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('update', () => {
    it('shoud update a movie', () => {
      service.createMovie({
        title: 'test movie',
        year: 2020,
        genres: ['123'],
      })
      service.update(1, {title: 'test'})
      const movie = service.getOne(1)
      expect(movie.title).toEqual("test")
    })
    it('should throw 404 error', () => {
      try {
        service.update(999, {})
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.")
      }
    })
  })
});
