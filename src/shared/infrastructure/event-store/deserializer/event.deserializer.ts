import { Injectable, Type } from '@nestjs/common';

import { AlarmCreatedEvent } from '../../../../modules/domain/alarms/domain/events/alarm-created.event';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';
import { Event } from '../schemas/event.schema';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);

    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls as Type, event.data),
    };
  }

  getEventClassByType(type: string) {
    // We'll show a more scalable approach later
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
    }
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, unknown>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
