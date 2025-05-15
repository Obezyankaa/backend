import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export enum AvailableTags {
  WORK = 'work',
  HOME = 'home',
  DOG = 'dog',
  CHILDREN = 'children',
  CAR = 'car',
  PAY = 'pay',
}

export const AllowedTagsArray = Object.values(AvailableTags);

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  @IsIn(AllowedTagsArray, { each: true })
  tags: string[];

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
