import { ObjectId } from 'bson';
import { UserStationsDto } from 'src/dto/user-stations-dto';
import { Station } from 'src/schemas/station.schema';

export default class UserStationsBuilder {
  id: ObjectId;
  name: string;
  email: string;
  favorites: Station[];

  setId(id: ObjectId) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setFavorites(favorites: Station[]) {
    this.favorites = favorites;
    return this;
  }
  build(): UserStationsDto {
    return new UserStationsDto(this);
  }
}
