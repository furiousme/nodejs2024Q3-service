import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { scryptSync } from 'crypto';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(login: string, password: string) {
    const hashedPassword = this.getHashedPassword(password);
    const user = await this.userService.create(login, hashedPassword);
    return user;
  }

  async login(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    const hashedPassword = this.getHashedPassword(password);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password !== hashedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = 'This is access token';
    const refreshToken = 'This is refresh token';
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const accessToken = 'This is access token';
    const newRefreshToken = 'This is a new refresh token';
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  getHashedPassword(password: string): string {
    const salt = process.env.CRYPT_SALT; // todo: replace with config
    const res = scryptSync(password, salt, 32).toString('hex');
    return res;
  }
}
