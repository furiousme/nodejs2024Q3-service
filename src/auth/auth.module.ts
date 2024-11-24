import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(jwtRefreshConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
