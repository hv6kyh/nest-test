import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class MappingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(MappingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    this.logger.log('success handler');
    return next.handle().pipe(
      map(data => ({
        code: 200,
        data: data,
      })),
    );
  }
}
