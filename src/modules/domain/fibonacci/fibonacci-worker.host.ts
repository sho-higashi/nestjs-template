import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { filter, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { Worker } from 'worker_threads';

@Injectable()
export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private message$: Observable<{ id: string; result: number }> | undefined;

  private worker: Worker | undefined;

  onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.message$ = fromEvent(this.worker, 'message') as unknown as Observable<{
      id: string;
      result: number;
    }>;
  }

  onApplicationShutdown() {
    this.worker?.terminate();
  }

  run(n: number): Promise<number> {
    const uuid = randomUUID();
    this.worker!.postMessage({ id: uuid, n });

    return firstValueFrom(
      this.message$!.pipe(
        filter(({ id }) => id === uuid),
        map(({ result }) => result),
      ),
    );
  }
}
