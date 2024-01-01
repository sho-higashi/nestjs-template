import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PaymentFailedEvent } from './events/payment-failed.event';

@Injectable()
export class NotificationsService {
  #logger = new Logger(NotificationsService.name);

  @OnEvent(PaymentFailedEvent.KEY)
  sendPaymentNotification(event: PaymentFailedEvent) {
    this.#logger.log({
      event,
      message: 'Sending payment notification...',
    });
  }
}
