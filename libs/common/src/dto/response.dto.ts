import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseDto<T> {
  @ApiProperty()
  @Expose()
  success: boolean;

  @ApiProperty()
  @Expose()
  message: string | null;

  @ApiProperty({ type: Object, description: 'Data of type T' })
  @Expose()
  data: T;

  @ApiProperty()
  @Expose()
  error: any;

  @ApiProperty()
  @Expose()
  meta?: any;

  constructor(partial?: Partial<ResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
