import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from '../types/auth-jwt-payload';
import { Inject, Injectable } from '@nestjs/common';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(jwtRefreshConfig.KEY)
    private readonly jwtRefreshConfiguration: ConfigType<
      typeof jwtRefreshConfig
    >,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtRefreshConfiguration.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    return { id: payload.sub, login: payload.login };
  }
}
