import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FuelPriceDocument = FuelPrice & Document;

@Schema()
export class FuelPrice {
  @Prop({ type: Number, required: true })
  stationExternalId: number;

  @Prop({ type: Number, required: true })
  fuelExternalId: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Date, required: true })
  date: string;
}

export const FuelPriceSchema = SchemaFactory.createForClass(FuelPrice);
