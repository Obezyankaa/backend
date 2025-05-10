import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findOneId(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException('фильм не найден');
    }
    return movie;
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto);
    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findOneId(id);
    Object.assign(movie, dto);
    await this.movieRepository.save(movie);
    return true;
  }

  async updateIsPublic(id: string): Promise<boolean> {
    const movie = await this.findOneId(id);
    movie.isAvailable = !movie.isAvailable;
    await this.movieRepository.save(movie);
    return true;
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await this.findOneId(id);
    await this.movieRepository.delete(movie);
  }
}
