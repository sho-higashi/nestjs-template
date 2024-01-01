import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { CircuitBreaker } from './circuit-breaker';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly circuitBreakerByHandler = new WeakMap<
    // eslint-disable-next-line @typescript-eslint/ban-types
    Function,
    CircuitBreaker
  >();

  intercept(context: ExecutionContext, next: CallHandler) {
    const methodRef = context.getHandler();
    let circuitBreaker: CircuitBreaker | undefined;
    if (this.circuitBreakerByHandler.has(methodRef)) {
      circuitBreaker = this.circuitBreakerByHandler.get(methodRef);
    } else {
      circuitBreaker = new CircuitBreaker();
      this.circuitBreakerByHandler.set(methodRef, circuitBreaker);
    }

    return circuitBreaker ? circuitBreaker.exec(next) : next.handle();
  }
}
