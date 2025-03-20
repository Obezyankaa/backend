import { Controller, Get } from '@nestjs/common';
import { AnimalsService } from './animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  async getAllAnimals() {
    return this.animalsService.getAllAnimals();
  }
}
