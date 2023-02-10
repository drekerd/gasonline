import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FuelDocument = Fuel & Document;

@Schema()
export class Fuel {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: Number, required: true, ref: 'Station', refPath: 'externalId' })
  stationId: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  fuel: string;

  @Prop({ type: Date, required: true, default: () => new Date() })
  lastUpdated: Date;
}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
