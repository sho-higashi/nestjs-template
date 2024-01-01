import { Controller, Get, Req } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';

import { ErrorResponse } from '../dto';
import { PaymentWebhookResponse } from './entities/webhook.entity';
import { PaymentFailedEvent } from './events/payment-failed.event';

@Controller('payments-webhook')
export class PaymentsWebhookController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly moduleRef: ModuleRef,
  ) {}

  @Get()
  @ApiOperation({ summary: 'webhook for payment' })
  @ApiOkResponse({ type: PaymentWebhookResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  webhook(@Req() request: Request) {
    const contextId = ContextIdFactory.create();
    const paymentId = Math.floor(Math.random() * 1000);
    this.moduleRef.registerRequestByContextId(request, contextId);
    this.eventEmitter.emit(
      PaymentFailedEvent.KEY,
      new PaymentFailedEvent(paymentId, { contextId }),
    );
  }
}
