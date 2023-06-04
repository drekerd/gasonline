import { UserRepository } from '../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../dto/user';
import { UserServiceInterface } from '../interfaces/user-service.interface';
import * as console from 'console';
import { ObjectId } from 'mongoose';
import { StationService } from './station.service';
import { FuelService } from './fuel.service';
import UserStationsBuilder from 'src/builders/user-stations-builder';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly stationService: StationService,
    private readonly fuelService: FuelService,
    private readonly userMapper: UserMapper,
  ) {}

  async getUserById(id: string, comingFrom?: string): Promise<UserDto> {
    console.log('erere', id);
    console.log('coming', comingFrom);

    const user = await this.userRepository.getUserById(id);
    const userasd = this.userMapper.convertUserToUserDto(user);
    console.log('user befor ereturn', userasd);
    return userasd;
  }

  async getUserByEmail(id: string): Promise<UserDto> {
    const user = await this.userRepository.getUserByEmail(id);
    return this.userMapper.convertUserToUserDto(user);
  }

  async createUser(user: User): Promise<UserDto> {
    const userToCreate = this.userMapper.convertUserToUserRepositoryDto(user);
    const createdUser = await this.userRepository.createUser(userToCreate);
    return this.userMapper.convertUserToUserDto(createdUser);
  }

  async getUserFavoriteStations(
    userId: ObjectId,
    filters: Map<string, string>,
  ): Promise<any> {
    try {
      const user = await this.userRepository.findUser(userId);

      console.log('user.favorites', user.favorites);
      const stationIds = user.favorites.map((favorite) => favorite);

      const favoriteStationDetails =
        await this.stationService.findStationByExternalId(stationIds, filters);

      return new UserStationsBuilder()
        .setId(user.id)
        .setEmail(user.email)
        .setName(user.name)
        .setFavorites(favoriteStationDetails);
    } catch (err) {
      console.log('An error occurred while saving to favourites :: ', err);
    }
  }

  async addStationToFavorite(
    userId: string,
    stationId: number,
  ): Promise<UserDto> {
    try {
      const station = await this.stationService.findStationByExternalId(
        stationId,
      );

      if (!station) {
        throw new NotFoundException('Station not found');
      }

      const updatedUser = await this.userRepository.addStationToFavorite(
        userId,
        stationId,
      );
      return this.userMapper.convertUserToUserDto(updatedUser);
    } catch (err) {
      console.log('An error occurred while saving to favourites :: ', err);
    }
  }
}
