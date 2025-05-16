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

  // @IsNotEmpty()
  // @IsInt()
  // @Min(1888)
  // @Max(new Date().getFullYear())
  // releaseYear: number;

  // @IsString()
  // imageUrl: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // @IsOptional()
  // isPublic: boolean;
}
