import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = UserDao & Document;

@Schema({ collection: 'users' })
export class UserDao {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: [
      {
        type: Number,
      },
    ],
  })
  favorites: number[];
}

export const UserSchema = SchemaFactory.createForClass(UserDao);
