import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseDto } from '../dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const classSerializerInterceptor = new ClassSerializerInterceptor(
      this.reflector,
      { excludeExtraneousValues: true },
    );

    // Panggil ClassSerializerInterceptor untuk menangani serialisasi
    const serializedContext = classSerializerInterceptor.intercept(
      context,
      next,
    );

    return serializedContext.pipe(
      map((response) => {
        // Memeriksa apakah ada 'message' yang disediakan di dalam respons
        const message = response.message || 'Request successfully retrieved';

        // Memeriksa apakah ada 'meta' yang disediakan di dalam respons
        const meta = response.meta || undefined;

        // Keluarkan data dan pesan dari respons
        const data = response.data !== undefined ? response.data : response;

        return new ResponseDto({
          success: true,
          message: message,
          data: data,
          err: null,
          meta,
        });
      }),
    );
  }
}
