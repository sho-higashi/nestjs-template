import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MaterializedAlarmView {
  @Prop({ index: true, unique: true })
  id!: string;

  @Prop(
    raw([
      {
        id: String,
        name: String,
        type: {
          type: String,
        },
      },
    ]),
  )
  items!: Array<{
    id: string;
    name: string;
    type: string;
  }>;

  @Prop()
  name!: string;

  @Prop()
  type!: string;
}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(
  MaterializedAlarmView,
);
