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
      include: {
        actors: true,
        poster: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, description, actorIds, imageUrl } = dto;

    return await this.prismaService.movie.create({
      data: {
        title,
        description,
        actors: {
          connect: actorIds.map((id) => ({ id })), // 👈 связываем актёров по ID
        },
        poster: {
          create: {
            url: imageUrl,
          },
        },
      },
      include: {
        actors: true, // если хочешь вернуть фильм сразу с актёрами
        poster: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
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
