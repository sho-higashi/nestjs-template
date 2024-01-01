import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ErrorResponse } from '../../../dto';
import { FibonacciService } from './fibonacci.service';

@ApiTags('fibonacci')
@Controller('fibonacci')
export class FibonacciController {
  constructor(private readonly service: FibonacciService) {}

  @Get()
  @ApiOperation({ summary: 'get coffee' })
  @ApiOkResponse({ type: Number })
  @ApiBadRequestResponse({ type: ErrorResponse })
  fibonacci(@Query('n') num: number): Promise<number> {
    const n = Number(num);
    if (isNaN(n)) throw new BadRequestException('n is not a number');

    return this.service.fibonacci(n);
  }
}
