import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { CommonResponse } from 'src/types/response';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next$: CallHandler<T>,
  ): Observable<CommonResponse<T>> {
    const { statusCode }: Response = context.switchToHttp().getResponse();

    return next$.handle().pipe(
      map((data: T) => ({
        success: {
          statusCode,
          data,
        },
        error: null,
      })),
    );
  }
}
