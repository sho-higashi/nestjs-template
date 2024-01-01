import { Module } from '@nestjs/common';

import { FibonacciController } from './fibonacci.controller';
import { FibonacciService } from './fibonacci.service';
import { FibonacciWorkerHost } from './fibonacci-worker.host';

@Module({
  controllers: [FibonacciController],
  providers: [FibonacciService, FibonacciWorkerHost],
})
export class FibonacciModule {}
