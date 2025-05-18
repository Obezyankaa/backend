import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'получить все фильмы',
    description: 'Возвращает список фильмов',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'фильмы найдены',
  })
  @Get()
  async findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({ summary: 'Создать фильм' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'форсаж' },
      },
    },
  })
  @Post()
  async create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @ApiOperation({
    summary: 'получить фильм по id',
    description: 'возвращает 1 фильм',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID фильма',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'фильм найден',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'фильм не найден',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.movieService.findOneId(id);
  }

  @Patch('/availability/:id')
  async updateAvailability(@Param('id') id: string) {
    return this.movieService.updateAvailability(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }
}
