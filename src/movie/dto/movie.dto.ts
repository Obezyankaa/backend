import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  // @IsNotEmpty()
  // @IsInt()
  // @Min(1888)
  // @Max(new Date().getFullYear())
  // releaseYear: number;

  // @IsString()
  // imageUrl: string;

  // @IsArray()
  // @IsUUID('4', { each: true })
  // actorIds: string[];

  // @IsNotEmpty()
  // @IsBoolean()
  // @IsOptional()
  // isPublic: boolean;
}
