import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
// import { CatsController } from './cats/cats.controller';
// import { CatsService } from './cats/cats.service';
// import { DogController } from './animals/dog/dog.controller';
// import { DogService } from './animals/dog/dog.service';
// import { AnimalsController } from './animals/animals.controller';
// import { AnimalsService } from './animals/animals.service';
// import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [AnimalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
