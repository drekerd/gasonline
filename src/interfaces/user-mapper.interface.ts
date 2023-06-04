import { UserDao } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { User } from '../dto/user';
import { UserRequest } from '../dto/user-request';

export interface UserMapperInterface {
  convertUserRequestToUser(userRequest: UserRequest): User;

  convertUserToUserRepositoryDto(user: User): UserDao;

  convertUserRepositoryToUser(userDao: UserDao): User;

  convertUserToUserDto(user: User): UserDto;
}
