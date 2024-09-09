import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseDto } from '../dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
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
