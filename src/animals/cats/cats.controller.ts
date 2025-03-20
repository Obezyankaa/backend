import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<void> {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Cat | string> {
    const cat = this.catsService.findOne(name);
    return cat ? cat : 'Кот не найден';
  }

  @Delete(':id')
  async deleteCat(@Param('id') id: string): Promise<string> {
    const deleted = this.catsService.deleteCat(Number(id));
    return deleted ? 'Кот удалён' : 'Кот не найден';
  }
}
