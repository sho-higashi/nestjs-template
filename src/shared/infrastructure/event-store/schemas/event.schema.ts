import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Event {
  @Prop({
    type: SchemaTypes.Mixed,
  })
  data!: Record<string, unknown>;

  @Prop()
  position!: number;

  @Prop()
  streamId!: string;

  @Prop()
  type!: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ position: 1, streamId: 1 }, { unique: true });
