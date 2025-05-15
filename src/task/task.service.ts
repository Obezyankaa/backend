import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entities';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[] | string> {
    const tasks = await this.taskRepository.find({
      order: { createdAt: 'desc' },
    });
    if (tasks.length === 0) {
      return 'Задач пока нет';
    }
    return tasks;
  }

  async findOneId(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }
    return task;
  }

  async create(dto: CreateTaskDto) {
    const { title, tags } = dto;
    const task = this.taskRepository.create({
      title,
      tags,
    });
    return await this.taskRepository.save(task);
  }

  async update(id: string): Promise<boolean> {
    const task = await this.findOneId(id);
    task.isCompleted = !task.isCompleted;
    await this.taskRepository.save(task);
    return true;
  }

  async delete(id: string): Promise<void> {
    const task = await this.findOneId(id);
    if (task) {
      await this.taskRepository.remove(task);
    }
  }
}
