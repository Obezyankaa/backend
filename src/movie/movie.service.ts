import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, description } = dto;
    const movie = this.prismaService.movie.create({
      data: {
        title,
        description,
      },
    });
    return await movie;
  }

  async findOneId(id: string) {
    const movie = this.prismaService.movie.findUnique({
      where: {
        id: id,
      },
    });
    return await movie;
  }

  async updateAvailability(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      select: { isAvailable: true }, // можно взять только нужное поле
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    return await this.prismaService.movie.update({
      where: { id },
      data: {
        isAvailable: !movie.isAvailable,
      },
    });
  }

  async deleteMovie(id: string) {
    return await this.prismaService.movie.delete({
      where: {
        id,
      },
    });
  }
}
