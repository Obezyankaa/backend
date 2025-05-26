import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'ewaE!@3213DSadADASD1231SAda...',
  })
  accessToken: string;
}
