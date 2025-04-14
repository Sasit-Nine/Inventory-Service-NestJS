import { IsOptional, IsString, IsNumber, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateInventoryDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  quantity: number;
  @IsOptional()
  @IsNumber()
  promotionId?: number;
  @IsNumberString()
  test: number;
}
