import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(catDto: CreateCatDto) {
    const newCat: Cat = { id: Date.now(), ...catDto };
    this.cats.push(newCat);
    console.log('Текущий массив котов:', this.cats);
  }

  findAll(): Cat[] {
    console.log('Получаем список котов:', this.cats);
    return this.cats;
  }

  findOne(name: string): Cat | undefined {
    return this.cats.find((el) => el.name === name);
  }

  deleteCat(id: number): boolean {
    const index = this.cats.findIndex((el) => el.id === id);
    if (index === -1) return false; // Если кота нет, вернуть false

    this.cats.splice(index, 1); // Удаляем кота из массива
    return true;
  }
}
