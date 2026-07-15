import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '@prisma-db/prisma.service';
import { RedisService } from '@redis/redis.service';
import { PosthogService } from '@posthog/posthog.service';
import type { AuthTokens, JwtPayload } from '@app-types/auth.types';

const RT_BLACKLIST = 'rt_blacklist:';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
    private readonly posthog: PosthogService,
  ) {}

  async issueTokens(userId: string, email: string, role: string): Promise<AuthTokens> {
    const jti = uuidv4();

    const accessPayload: JwtPayload = { sub: userId, email, role };
    const refreshPayload: JwtPayload = { sub: userId, email, role, jti };

    const accessExpiresIn = this.config.get<string>('jwt.accessExpiresIn') ?? '15m';
    const refreshExpiresIn = this.config.get<string>('jwt.refreshExpiresIn') ?? '7d';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(accessPayload, {
        secret: this.config.get<string>('jwt.accessSecret'),
        expiresIn: accessExpiresIn,
      }),
      this.jwt.signAsync(refreshPayload, {
        secret: this.config.get<string>('jwt.refreshSecret'),
        expiresIn: refreshExpiresIn,
      }),
    ]);

    const expiresAt = this.addExpiry(refreshExpiresIn);
    await this.prisma.refreshToken.create({ data: { jti, userId, expiresAt } });

    return { accessToken, refreshToken, expiresIn: 900 };
  }

  async refresh(userId: string, jti: string): Promise<AuthTokens> {
    const isBlacklisted = await this.redis.exists(`${RT_BLACKLIST}${jti}`);
    if (isBlacklisted) {
      throw new UnauthorizedException('Refresh token has been revoked.');
    }

    const stored = await this.prisma.refreshToken.findUnique({ where: { jti } });
    if (!stored || stored.userId !== userId || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token is invalid or expired.');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Account not found or deactivated.');
    }

    await this.blacklist(jti);
    await this.prisma.refreshToken.delete({ where: { jti } });

    return this.issueTokens(user.id, user.email, user.role);
  }

  async logout(userId: string, jti: string): Promise<void> {
    await this.blacklist(jti);
    await this.prisma.refreshToken.deleteMany({ where: { jti } });
    this.posthog.captureLogout(userId);
  }

  async logoutByRefreshToken(userId: string, rawRefreshToken: string): Promise<void> {
    let jti: string | undefined;
    try {
      const payload = this.jwt.decode(rawRefreshToken) as any;
      jti = payload?.jti;
    } catch {
      // malformed token — fall through and clear by userId
    }
    if (jti) {
      await this.blacklist(jti);
      await this.prisma.refreshToken.deleteMany({ where: { jti } });
    }
    this.posthog.captureLogout(userId);
  }

  async logoutAll(userId: string): Promise<void> {
    const tokens = await this.prisma.refreshToken.findMany({ where: { userId } });
    await Promise.all(tokens.map((t) => this.blacklist(t.jti)));
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    this.posthog.captureLogoutAll(userId);
  }

  async blacklist(jti: string): Promise<void> {
    const refreshExpiresIn = this.config.get<string>('jwt.refreshExpiresIn') ?? '7d';
    await this.redis.set(`${RT_BLACKLIST}${jti}`, '1', this.toSeconds(refreshExpiresIn));
  }

  private addExpiry(expiry: string): Date {
    return new Date(Date.now() + this.toSeconds(expiry) * 1000);
  }

  private toSeconds(expiry: string): number {
    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1), 10);
    const map: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };
    return value * (map[unit] ?? 1);
  }
}
