export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

/**
 * Serializable event that can be stored in the event store.
 * @template T Event data type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SerializableEvent<T = any> {
  data: SerializedEventPayload<T>;
  position: number;
  streamId: string;
  type: string;
}
