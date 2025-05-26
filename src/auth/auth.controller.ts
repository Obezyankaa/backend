import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginReguest } from './dto/login.dto';
import type { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'создает аккаунт для пользователя',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'некорректные входные данные' })
  @ApiConflictResponse({
    description: 'пользователь с такой почтой уже существует ',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'вход в аккаунт',
    description: 'авторизует пользоателя и выдаёт токен доступа',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'некорректные входные данные' })
  @ApiNotFoundResponse({ description: 'пользователь не найден' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginReguest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'обновление токена ',
    description: 'генерирует новый токен для пользователя',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({ description: 'недействительный refresh-token' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'выход из аккаунта',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string) {
    return id;
  }
}
