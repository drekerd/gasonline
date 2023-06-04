import { ObjectId } from 'bson';
import { User } from './user';
import { Station } from '../schemas/station.schema';

export class UserDto {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  favorites: number[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.favorites = user.favorites;
  }
}
