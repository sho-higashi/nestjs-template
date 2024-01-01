import { ContextId } from '@nestjs/core';

export class PaymentFailedEvent {
  static readonly KEY = 'PAYMENT_FAILED';

  constructor(
    public readonly paymentId: number,
    public readonly meta: { contextId: ContextId },
  ) {}
}
