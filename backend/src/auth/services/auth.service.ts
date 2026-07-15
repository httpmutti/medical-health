import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '@prisma-db/prisma.service';
import { PosthogService } from '@posthog/posthog.service';
import { TokenService } from './token.service';
import type { AuthUser, AuthTokens } from '@app-types/auth.types';
import type { RegisterInput, LoginInput } from '../dto';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly posthog: PosthogService,
  ) {}

  async register(dto: RegisterInput): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const hashed = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
      },
    });

    const tokens = await this.tokenService.issueTokens(user.id, user.email, user.role);
    this.posthog.captureRegister(user.id, user.email);
    return { user: this.sanitize(user), tokens };
  }

  async login(dto: LoginInput): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    // Run bcrypt compare even for missing user — prevents timing attacks
    const passwordMatch = user
      ? await bcrypt.compare(dto.password, user.password)
      : await bcrypt.compare(dto.password, '$2a$12$dummyhashtopreventtimingattacks1234');

    if (!user || !passwordMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account has been deactivated.');
    }

    const tokens = await this.tokenService.issueTokens(user.id, user.email, user.role);
    this.posthog.captureLogin(user.id, user.email);
    return { user: this.sanitize(user), tokens };
  }

  private sanitize(user: any): AuthUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
  }
}
