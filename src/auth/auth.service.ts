import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { scryptSync } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(jwtRefreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof jwtRefreshConfig>,
  ) {}

  async create(login: string, password: string) {
    const hashedPassword = this.getHashedPassword(password);
    const user = await this.userService.create(login, hashedPassword);
    return user;
  }

  async login(login: string, password: string) {
    const user = await this.validateAndGetUser(login, password);
    const tokens = await this.generateTokensPair(user);
    return tokens;
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
    const salt = this.configService.get('crypt.salt');
    return scryptSync(password, salt, 32).toString('hex'); // todo: handle asynchronously
  }

  async generateTokensPair(user: User) {
    const payload = { sub: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshTokenConfig,
    );
    return { accessToken, refreshToken };
  }

  async validateAndGetUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    if (!user) throw new UnauthorizedException('User not found');
    const hashedPassword = this.getHashedPassword(password);
    if (user.password !== hashedPassword)
      throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
