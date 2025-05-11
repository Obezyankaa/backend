import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entities';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly posterRepository: Repository<MoviePosterEntity>,
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
      relations: ['actors', 'poster'],
    });

    if (!movie) {
      throw new NotFoundException('фильм не найден');
    }
    return movie;
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, imageUrl, actorIds } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('один или несколько актеров не найдено');

    let poster: MoviePosterEntity | null = null;

    if (imageUrl) {
      poster = this.posterRepository.create({
        url: imageUrl,
      });
      await this.posterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });
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
    console.log(id);
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
    if (movie) {
      await this.movieRepository.remove(movie);
    }
  }
}
