import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EVENT_STORE_CONNECTION } from '../../../core/core.constants';
import { SerializableEvent } from '../../../shared/domain/interfaces/serializable-event';

@Injectable()
export class MongoEventStore {
  private readonly logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
  ) {}

  async persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void> {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const session = await this.eventStore.startSession();
    try {
      session.startTransaction();
      await this.eventStore.insertMany(events, { ordered: true, session });

      await session.commitTransaction();
      this.logger.log(`Events persisted with length: ${events.length}`);
    } catch (error) {
      await session.abortTransaction();
      const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
      if (
        typeof error === 'object' &&
        error &&
        'code' in error &&
        error.code === UNIQUE_CONSTRAINT_ERROR_CODE
      ) {
        this.logger.error('Duplicated event');
      } else {
        throw error;
      }
    } finally {
      session.endSession();
    }
  }
}
