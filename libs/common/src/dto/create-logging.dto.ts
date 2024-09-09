import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLoggingDto {
  @IsString()
  @IsOptional()
  typeLog?: string;

  @IsString()
  requestData: string;

  @IsString()
  @IsOptional()
  responseData?: string;

  @IsNumber()
  logStatus: number;

  @IsString()
  createdBy: string;

  constructor(partial?: Partial<CreateLoggingDto>) {
    Object.assign(this, partial);
  }
}
