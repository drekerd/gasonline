import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StationDocument = Station & Document;

@Schema()
export class Station {
  @Prop({ type: Number, required: true })
  externalId: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  utilization: string;

  @Prop({ type: String, required: true })
  typeOfStation: string;

  @Prop({ type: [String], required: true })
  typesOfFuel: string[];

  @Prop({
    type: {
      district: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      parish: { type: String, required: true },
      postalCode: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      orientation: { type: String, required: true },
    },
    required: true,
  })
  address: {
    district: string;
    city: string;
    street: string;
    parish: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    orientation: string;
  };

  @Prop({
    type: {
      workingDays: { type: String, required: true },
      saturday: { type: String, required: true },
      sunday: { type: String, required: true },
      holyday: { type: String, required: true },
    },
    required: true,
  })
  openingHours: {
    workingDays: string;
    saturday: string;
    sunday: string;
    holyday: string;
  };
}

export const StationSchema = SchemaFactory.createForClass(Station);
