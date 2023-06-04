import { ObjectId } from 'bson';
import { Station } from '../schemas/station.schema';

export class User {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  favorites: number[];

  // constructor(user: UserDao) {
  //   this.id = user['_id'];
  //   this.name = user.name;
  //   this.email = user.email;
  // }
}
