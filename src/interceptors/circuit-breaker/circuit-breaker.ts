import { CallHandler } from '@nestjs/common';
import { tap, throwError } from 'rxjs';

const SUCCESS_THRESHOLD = 3;
const FAILURE_THRESHOLD = 3;
const OPEN_TO_HALF_OPEN_WAIT_TIME = 5000;

enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private failureCount = 0;

  private lastError: Error | undefined;

  private nextAttempt: number | undefined;

  private state: CircuitBreakerState = CircuitBreakerState.Closed;

  private successCount = 0;

  exec(next: CallHandler) {
    if (this.state === CircuitBreakerState.Open) {
      if (this.nextAttempt && this.nextAttempt > Date.now()) {
        return throwError(() => this.lastError);
      }
      this.state = CircuitBreakerState.HalfOpen;
    }

    return next.handle().pipe(
      tap({
        error: (err) => this.handleError(err),
        next: () => this.handleSuccess(),
      }),
    );
  }

  handleSuccess(): void {
    this.failureCount = 0;
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount += 1;
      if (this.successCount >= SUCCESS_THRESHOLD) {
        this.successCount = 0;
        this.state = CircuitBreakerState.Closed;
      }
    }
  }

  handleError(err: Error): void {
    this.failureCount += 1;
    if (
      this.failureCount >= FAILURE_THRESHOLD ||
      this.state === CircuitBreakerState.HalfOpen
    ) {
      this.state = CircuitBreakerState.Open;
      this.lastError = err;
      this.nextAttempt = Date.now() + OPEN_TO_HALF_OPEN_WAIT_TIME;
    }
  }
}
