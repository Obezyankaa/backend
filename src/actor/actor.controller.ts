import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteActor(@Param('id') id: string) {
    return this.actorService.deleteActor(id);
  }
}
