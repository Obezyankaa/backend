import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.taskService.findId(id);
  }

  @Post('create')
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Patch(':id')
  upadte(@Param('id') id: string) {
    return this.taskService.update(id);
  }
}
