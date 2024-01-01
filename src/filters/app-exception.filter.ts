import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ErrorResponse } from '../dto';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(AppExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error({
      message: exception.message,
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
    const errorResponse: ErrorResponse = {
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
