/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ description: 'Nazwa produktu', example: 'USB Rubber Ducky' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Cena produktu (> 0)',
    example: 49.99,
    minimum: 0.01,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  price: number;
}
