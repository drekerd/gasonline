import { ObjectId } from 'bson';
import UserStationsBuilder from 'src/builders/user-stations-builder';
import { Station } from 'src/schemas/station.schema';

export class UserStationsDto {
  id: ObjectId;
  name: string;
  email: string;
  favorites: Station[];

  constructor(userStationsBuilder: UserStationsBuilder) {
    this.id = userStationsBuilder.id;
    this.name = userStationsBuilder.name;
    this.email = userStationsBuilder.email;
    this.favorites = userStationsBuilder.favorites;
  }
}
