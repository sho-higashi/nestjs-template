import { Injectable } from '@nestjs/common';

import { VersionedAggregateRoot } from '../../../../shared/domain/aggregate-root';
import { SerializableEvent } from '../../../../shared/domain/interfaces/serializable-event';

@Injectable()
export class EventSerializer {
  serialize<T>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): SerializableEvent<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventType = (event as any).constructor?.name;
    if (!eventType) {
      throw new Error('Event type not found');
    }

    return {
      data: this.toJSON(event),
      position: dispatcher.version.value + 1,
      streamId: dispatcher.id,
      type: eventType,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toJSON<T>(data: T): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if ('toJSON' in data && typeof data.toJSON === 'function') {
      return data.toJSON();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.toJSON(item));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.entries(data).reduce<Record<string, any>>(
      (acc, [key, value]) => {
        acc[key] = this.toJSON(value);

        return acc;
      },
      {},
    );
  }
}
