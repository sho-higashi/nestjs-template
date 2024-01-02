import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import { MongoEventStore } from './event-store/mongo-event-store';
import { EventStorePublisher } from './event-store/publisher/event-store.publisher';
import { EventSchema } from './event-store/schemas/event.schema';
import { EventSerializer } from './event-store/serializer/event.serializer';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Event.name,
          schema: EventSchema,
        },
      ],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [EventSerializer, EventStorePublisher, MongoEventStore],
})
export class SharedInfraStructureModule {}
