import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];

  @IsString()
  imageUrl: string;
}
