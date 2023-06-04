import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/users.services';
import { UserRequest } from '../dto/user-request';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import * as console from 'console';
import { Public } from 'src/decorators/auth.decortor';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Get('/favorites')
  async getStationToFavorite(
    @Req() request,
    @Query('filterBy') filterBy: string,
    @Query('filterValue') filterValue: string,
  ): Promise<any> {
    console.log('userId', request.user.id);
    console.log('filterBy', filterBy);
    const filters = new Map<string, string>();

    if (filterBy || filterValue) {
      if (!filterBy) {
        throw new BadGatewayException('filterBy must be filled');
      }

      if (!filterValue) {
        throw new BadGatewayException('filterValue must be filled');
      }
      filters.set(filterBy, filterValue);
    }

    return this.userService.getUserFavoriteStations(request.user.id, filters);
  }

  @Post('/favorites')
  async addStationToFavorite(
    @Req() request,
    @Query('stationId') stationId: number,
  ): Promise<UserDto> {
    return this.userService.addStationToFavorite(request.user.id, stationId);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    console.log('here');
    return this.userService.getUserById(id, 'controller');
  }

  @Public()
  @Post()
  async createUser(@Body() requestBody: UserRequest): Promise<UserDto> {
    const user = this.userMapper.convertUserRequestToUser(requestBody);
    return this.userService.createUser(user);
  }
}
