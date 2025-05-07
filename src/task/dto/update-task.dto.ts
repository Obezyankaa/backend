import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
export class UpdateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty({ message: 'Название задачи не может быть пустым' })
  @Length(2, 20, { message: 'минимальная длинна 2 максимальная длинна 20' })
  title: string;

  @IsBoolean({ message: 'Cтатус должен быть булевым' })
  isCompleted: boolean;
}
