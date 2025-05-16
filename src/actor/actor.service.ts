import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from '@prisma/client';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    return await this.prismaService.actor.create({
      data: {
        name: dto.name,
      },
    });
  }

  async deleteActor(id: string) {
    return await this.prismaService.actor.delete({
      where: {
        id,
      },
    });
  }
}
