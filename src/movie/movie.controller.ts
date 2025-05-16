import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  async findAll() {
    return this.movieService.findAll();
  }

  @Post()
  async create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

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
