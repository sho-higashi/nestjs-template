import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import Piscina from 'piscina';

@Injectable()
export class FibonacciService {
  fibonacciWorker = new Piscina({
    filename: resolve(__dirname, 'fibonacci.worker.js'),
  });

  async fibonacci(n: number): Promise<number> {
    return this.fibonacciWorker.run(n);
  }
}
