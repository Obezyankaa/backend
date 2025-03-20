import { Body, Controller, Get, Post } from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './interface/dog.interface';

@Controller('dogs')
export class DogController {
  constructor(private dogService: DogService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto): Promise<void> {
    this.dogService.create(createDogDto);
  }

  @Get()
  async findAll(): Promise<Dog[]> {
    return this.dogService.findAll();
  }
}
