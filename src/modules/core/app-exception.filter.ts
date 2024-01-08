import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ErrorResponse } from '../application/shared';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(AppExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = this.#convertException(exception, ctx);

    this.logger.error(errorResponse);
    response.status(errorResponse.statusCode).json(errorResponse);
  }

  #getStatus(exception: HttpException): number {
    try {
      return exception.getStatus();
    } catch {
      return 500;
    }
  }

  #convertException(
    exception: HttpException,
    ctx: ReturnType<ArgumentsHost['switchToHttp']>,
  ): ErrorResponse {
    try {
      const request = ctx.getRequest<Request>();

      return {
        message:
          typeof exception.message === 'string' && exception.message
            ? exception.message
            : 'エラーが生じました',
        method: request.method,
        path: request.url,
        statusCode: this.#getStatus(exception),
        timestamp: new Date().toISOString(),
      };
    } catch {
      const request = ctx.getRequest<Request>();

      return {
        message: 'エラーが生じました',
        method: request.method,
        path: request.url,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
