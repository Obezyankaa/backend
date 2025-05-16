import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}
}
