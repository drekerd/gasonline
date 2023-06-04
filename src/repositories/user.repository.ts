import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDao } from '../schemas/user.schema';
import { Model, ObjectId, Promise } from 'mongoose';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../dto/user';
import { UserServiceInterface } from '../interfaces/user-service.interface';
import * as console from 'console';
import { Public } from '../decorators/auth.decortor';
import { filter } from 'rxjs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserDao.name) private userModel: Model<UserDao>,
    private readonly userMapper: UserMapper,
  ) {}

  async getUserById(id: string): Promise<User> {
    console.log('id', id);
    const userDao = await this.userModel.findById({ _id: id });
    return this.userMapper.convertUserRepositoryToUser(userDao);
  }

  async getUserByEmail(email: string): Promise<User> {
    const userDao = await this.userModel.findOne({ email: email });
    if (!userDao) {
      throw new NotFoundException('User not found');
    }
    return this.userMapper.convertUserRepositoryToUser(userDao);
  }

  async createUser(userToSave: UserDao): Promise<User> {
    const newUser = new this.userModel({
      name: userToSave.name,
      email: userToSave.email,
      password: userToSave.password,
    });

    const createdUser = await newUser.save();

    return this.userMapper.convertUserRepositoryToUser(createdUser);
  }

  async findUser(userId: ObjectId): Promise<User> {
    // let expression = {};
    // const filtersArray = Array.from(filters)[0];
    // let filterBy = '';
    // let filterValue = '';
    // if (filtersArray) {
    //   filterBy = filtersArray[0];
    //   filterValue = filtersArray[1];
    //   expression = {
    //     $eq: ['$' + filterBy, filterValue],
    //   };
    // }
    const returnedUser = await this.userModel.findOne({ _id: userId }).exec();

    console.log('UC', returnedUser);

    const user = new User();
    user.id = returnedUser._id;
    user.name = returnedUser.name;
    user.email = returnedUser.email;
    user.password = returnedUser.password;
    user.favorites = returnedUser.favorites;

    return user;

    // const favs = await this.userModel
    //   .findById({ _id: userId })
    //   .populate({
    //     path: 'favourites',
    //     model: 'Station',
    //   })
    //   .exec();

    // console.log('favts', favs);
  }

  async addStationToFavorite(userId, stationId): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { favourites: stationId } },
      { new: true },
    );

    return this.userMapper.convertUserRepositoryToUser(updatedUser);
  }

  async cenas() {
    return true;
  }
}
