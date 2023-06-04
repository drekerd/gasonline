import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StationDocument = Station & Document;

@Schema()
export class Station {
  @Prop({ type: Number, required: true })
  externalId: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  registryDate: string;

  @Prop({ type: String, required: true })
  entityName: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  district: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  parish: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String })
  postalCode: string;

  @Prop({ type: String })
  orientation: string;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: String, required: true })
  use: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String })
  observations: string;

  @Prop({ type: String })
  weekDaysSchedule: string;

  @Prop({ type: String })
  weekDaysOpeningHours: string;

  @Prop({ type: String })
  weekDaysClosingHours: string;

  @Prop({ type: String })
  saturdaySchedule: string;

  @Prop({ type: String })
  saturdayOpeningHours: string;

  @Prop({ type: String })
  saturdayClosingHours: string;

  @Prop({ type: String })
  sundaySchedule: string;

  @Prop({ type: String })
  sundayOpeningHours: string;

  @Prop({ type: String })
  sundayClosingHours: string;

  @Prop({ type: String })
  holidaySchedule: string;

  @Prop({ type: String })
  holidayOpeningHours: string;

  @Prop({ type: String })
  holidayClosingHours: string;

  @Prop({ type: [Number], required: true })
  fuels: number[];
}

export const StationSchema = SchemaFactory.createForClass(Station);
