import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  // IsUrl,
  // IsUUID,
  Length,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  // @IsString({ message: 'описание должно быть строкой' })
  // @IsOptional()
  // description: string;

  // @IsInt({ message: 'приоритет должен быть целым числом' })
  // @IsPositive({ message: 'приоритет должен быть положительным числом' })
  // @IsOptional()
  // priority: number;

  // @IsArray({ message: 'теги должны быть массивом строк' })
  // @IsEnum(TaskTag, { each: true, message: 'таск может быть work, study, home' })
  // @IsOptional()
  // tags: TaskTag[];

  // // @IsUrl({}, { message: 'не корректный формат url' })
  // // @IsOptional()
  // // websiteUrl: string;

  // // @IsUUID('4', { message: 'Не корректный формат UUID' })
  // // userId: string;
}
