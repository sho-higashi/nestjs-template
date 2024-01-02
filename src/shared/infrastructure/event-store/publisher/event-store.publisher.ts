import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';

import { VersionedAggregateRoot } from '../../../../shared/domain/aggregate-root';
import { MongoEventStore } from '../mongo-event-store';
import { EventSerializer } from '../serializer/event.serializer';

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  constructor(
    private readonly eventStore: MongoEventStore,
    private readonly eventSerializer: EventSerializer,
    private readonly eventBus: EventBus,
  ) {}

  onApplicationBootstrap() {
    this.eventBus.publisher = this;
  }

  publish<T extends IEvent = IEvent>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ) {
    const serializedEvent = this.eventSerializer.serialize(event, dispatcher);

    return this.eventStore.persist(serializedEvent);
  }

  publishAll<T extends IEvent = IEvent>(
    events: T[],
    dispatcher: VersionedAggregateRoot,
  ) {
    const serializedEvent = events
      .map((event) => this.eventSerializer.serialize(event, dispatcher))
      .map((serializedEvent, index) => ({
        ...serializedEvent,
        position: dispatcher.version.value + index + 1,
      }));

    return this.eventStore.persist(serializedEvent);
  }
}
