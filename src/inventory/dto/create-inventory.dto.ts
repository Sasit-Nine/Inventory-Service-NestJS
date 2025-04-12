import { IsOptional, IsString, IsNumber } from 'class-validator';
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
}
