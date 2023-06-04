import { ObjectId } from 'bson';
import { User } from './user';
import { Station } from '../schemas/station.schema';

export class UserJwt extends User {
  sub: string;

  constructor(
    id: ObjectId,
    name: string,
    email: string,
    password: string,
    sub: string,
    favorites: number[],
  ) {
    super();
    this.sub = sub;
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.favorites = favorites;
  }

  // constructor(user: UserDao) {
  //   this.id = user['_id'];
  //   this.name = user.name;
  //   this.email = user.email;
  // }
}
