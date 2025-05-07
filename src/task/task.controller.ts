import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(Number(id));
  }

  @Post('create')
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Put('change/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(Number(id), dto);
  }

  @Patch('patch/:id')
  patchUpdate(@Param('id') id: string, @Body() dto: Partial<UpdateTaskDto>) {
    return this.taskService.patchUpdate(Number(id), dto);
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }
}
