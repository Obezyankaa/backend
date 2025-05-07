import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  STYDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  title: string;

  @IsString({ message: 'описание должно быть строкой' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'приоритет должен быть целым числом' })
  @IsPositive({ message: 'приоритет должен быть положительным числом' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'теги должны быть массивом строк' })
  @IsEnum(TaskTag, { each: true, message: 'таск может быть work, stydy, home' })
  @IsOptional()
  tags: TaskTag[];
}
