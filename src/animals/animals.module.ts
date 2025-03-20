import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { CatsModule } from './cats/cats.module';
import { DogModule } from './dog/dog.module';

@Module({
  imports: [CatsModule, DogModule],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
