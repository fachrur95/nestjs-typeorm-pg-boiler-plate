import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderByDto } from './order-by.dto';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  currentPage: number;

  @IsBoolean()
  @IsOptional()
  total?: boolean;

  @ValidateNested()
  @Type(() => OrderByDto)
  @IsOptional()
  orderBy: OrderByDto;

  @IsString()
  @IsOptional()
  search?: string;
}
