import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import {
  invalidCredentialsResponse,
  invalidRefreshTokenResponse,
  tokensResponseExample,
  userResponseExample,
} from 'src/response-examples';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *
   * Create user
   */
  @Post('signup')
  @ApiCreatedResponse({
    type: User,
    description: 'The user has been created',
    example: userResponseExample,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    const user = await this.authService.create(body.login, body.password);
    return user;
  }

  /**
   *
   * Log user in, return tokens
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    description: 'Get auth tokens',
    example: tokensResponseExample,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    example: invalidCredentialsResponse,
  })
  @ApiBody({ type: LoginDto })
  async login(
    @Request() req,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.authService.login(req.user);
    return tokens;
  }

  /**
   *
   * Refresh tokens
   */
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOkResponse({
    description: 'Get new tokens',
    example: tokensResponseExample,
  })
  @ApiForbiddenResponse({
    description: 'Refresh token is invalid or expired',
    example: invalidRefreshTokenResponse,
  })
  @ApiBody({ type: RefreshTokenDto })
  @Post()
  async refreshToken(
    @Request() req,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.authService.refreshToken(req.user);
    return tokens;
  }
}
