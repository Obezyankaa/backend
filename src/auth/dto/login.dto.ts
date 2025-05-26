import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginReguest {
  @ApiProperty({
    description: 'почтовый адрес',
    example: 'почта@чтото.ru',
  })
  @IsString({ message: 'email должно быть строкой' })
  @IsNotEmpty({ message: 'email обязательно для запонения' })
  @IsEmail({}, { message: 'не корректный формат електронной почты' })
  email: string;
  @ApiProperty({
    description: 'пароль от аккаунта',
    example: '123456',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'password должен быть строкой' })
  @IsNotEmpty({ message: 'password обязательно для запонения' })
  @MinLength(6, { message: 'пароль должен иметь минимум 6 символов' })
  @MaxLength(128, { message: 'пароль доджен быть не больше 128 символов' })
  password: string;
}
