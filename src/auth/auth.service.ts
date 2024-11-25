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
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: LoggingService,
    @Inject(jwtRefreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof jwtRefreshConfig>,
  ) {}

  async create(login: string, password: string) {
    const hashedPassword = this.getHashedPassword(password);
    return await this.userService.create(login, hashedPassword);
  }

  async login(user: User) {
    return await this.generateTokensPair(user);
  }

  async refreshToken(user: User) {
    return this.generateTokensPair(user);
  }

  getHashedPassword(password: string): string {
    const salt = this.configService.get('crypt.salt');
    return scryptSync(password, salt, 32).toString('hex'); // todo: handle asynchronously
  }

  async generateTokensPair(user: User) {
    const payload = { userId: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshTokenConfig,
    );
    this.logger.log(`Tokens generated for user ${user.login}`);
    return { accessToken, refreshToken };
  }

  async validateAndGetUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    if (!user) {
      this.logger.error(`User ${login} not found`, 'AuthService');
      throw new UnauthorizedException('User not found');
    }
    const hashedPassword = this.getHashedPassword(password);
    if (user.password !== hashedPassword) {
      this.logger.error(`Invalid credentials for user ${login}`, 'AuthService');
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
