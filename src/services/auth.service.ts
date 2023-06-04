import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './users.services';
import { User } from '../dto/user';
import { UserJwt } from '../dto/user-jwt';
import * as console from 'console';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUserLocal(
    userEmail: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.userService.getUserByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Incorrect password');
    }

    return true;
  }

  async validateUserJwt(userJwt: any): Promise<User> {
    const { sub } = userJwt;
    console.log('sub', sub);
    const user = await this.userService.getUserById(sub, 'jwt');

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async login(username: string) {
    const user: User = await this.userService.getUserByEmail(username);
    const payload = { username: user.name, email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
