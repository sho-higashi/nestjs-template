import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';

import { EventContext } from './context/event-context';
import { PaymentFailedEvent } from './events/payment-failed.event';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly moduleRef: ModuleRef) {}

  #logger = new Logger(SubscriptionsService.name);

  @OnEvent(PaymentFailedEvent.KEY)
  async cancelSubscription(event: PaymentFailedEvent) {
    const eventContext = await this.moduleRef.resolve(
      EventContext,
      event.meta.contextId,
    );

    await this.#logger.log({
      event,
      message: 'cancelling subscription...',
      url: eventContext.request.url,
    });
  }
}
