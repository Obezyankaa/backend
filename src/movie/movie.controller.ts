import { Controller, Get, Headers, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  findAll(@Query() query: unknown) {
    return query;
  }

  @Get('headers')
  getHeaders(@Headers() headers: unknown) {
    return headers;
  }
}
