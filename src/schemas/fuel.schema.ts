import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FuelDocument = Fuel & Document;

@Schema()
export class  Fuel {
  @Prop({ type: Number, required: true })
  externalId: number;

  @Prop({ type: String, required: true })
  typeOfFuel: string;
}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
