import { UserMapperInterface } from '../interfaces/user-mapper.interface';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserDao } from '../schemas/user.schema';
import { User } from '../dto/user';
import { UserRequest } from '../dto/user-request';

@Injectable()
export class UserMapper implements UserMapperInterface {
  convertUserRepositoryToUser(userDao: UserDao): User {
    const user = new User();
    console.log(userDao)
    user.id = userDao['_id'];
    user.name = userDao.name;
    user.password = userDao.password;
    user.email = userDao.email;
    user.favorites = userDao.favorites;
    return user;
  }

  convertUserRequestToUser(userRequest: UserRequest): User {
    const user = new User();
    user.name = userRequest.name;
    user.email = userRequest.email;
    user.password = userRequest.password;
    return user;
  }

  convertUserToUserDto(user: User): UserDto {
    return new UserDto(user);
  }

  convertUserToUserRepositoryDto(user: User): UserDao {
    const userDao = new UserDao();
    userDao.name = user.name;
    userDao.email = user.email;
    userDao.password = user.password;
    return userDao;
  }
}
