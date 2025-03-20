import { Injectable } from '@nestjs/common';
import { CatsService } from './cats/cats.service';
import { DogService } from './dog/dog.service';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly catsService: CatsService,
    private readonly dogService: DogService,
  ) {}

  async getAllAnimals() {
    const cats = this.catsService.findAll();
    const dogs = this.dogService.findAll();
    return [...cats, ...dogs];
  }
}
