import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { statusCode } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() =>
        this.logger.log({
          statusCode,
        }),
      ),
    );
  }
}
