import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
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

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.movieService.findOneId(id);
  }

  @Post()
  async create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Patch(':id')
  async updateIsPublic(@Param('id') id: string) {
    return this.movieService.updateIsPublic(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }
}
