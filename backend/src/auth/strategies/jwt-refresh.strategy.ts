import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import type { JwtPayload } from '@app-types/auth.types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      // Accept refresh token from Bearer header OR request body
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req?.body?.refreshToken ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwt.refreshSecret'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    if (!payload.sub || !payload.jti) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const rawToken =
      req.headers.authorization?.replace('Bearer ', '') ?? req.body?.refreshToken;
    return { userId: payload.sub, email: payload.email, role: payload.role, jti: payload.jti, rawToken };
  }
}
