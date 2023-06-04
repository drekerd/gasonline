import { UserDto } from '../dto/user.dto';
import { User } from '../dto/user';
import { ObjectId } from 'mongoose';

export interface UserServiceInterface {
  getUserById(id: string): Promise<UserDto>;

  createUser(user: User): Promise<UserDto>;

  addStationToFavorite(userId: string, stationId: number): Promise<UserDto>;

  getUserByEmail(id: string): Promise<UserDto>;
}
