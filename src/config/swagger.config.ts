import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Awesome')
    .setDescription('API для фронтенда')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
