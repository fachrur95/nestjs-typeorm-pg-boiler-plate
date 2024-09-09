import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderBy } from '../interfaces';

export class OrderByDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(OrderBy)
  @IsOptional()
  direction?: OrderBy;
}
