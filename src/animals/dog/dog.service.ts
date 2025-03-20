import { Injectable } from '@nestjs/common';
import { Dog } from './interface/dog.interface';
import { CreateDogDto } from './dto/create-dog.dto';

@Injectable()
export class DogService {
  private readonly dogs: Dog[] = [];

  create(dogDto: CreateDogDto) {
    const newDog: Dog = { id: Date.now(), ...dogDto };
    this.dogs.push(newDog);
    console.log('Текущий массив котов:', this.dogs);
  }

  findAll(): Dog[] {
    console.log('Получаем список котов:', this.dogs);
    return this.dogs;
  }
}
