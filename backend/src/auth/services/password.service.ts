import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '@prisma-db/prisma.service';
import { OtpService } from '@redis/otp.service';
import { RedisService } from '@redis/redis.service';
import { PosthogService } from '@posthog/posthog.service';
import { TokenService } from './token.service';

const BCRYPT_ROUNDS = 12;
const PWD_RESET_TTL = 300; // 5 minutes

@Injectable()
export class PasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly otpService: OtpService,
    private readonly redis: RedisService,
    private readonly tokenService: TokenService,
    private readonly config: ConfigService,
    private readonly posthog: PosthogService,
  ) {}

  async forgotPassword(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Always return the same message — don't leak whether the email exists
    if (!user) return 'If this email is registered, an OTP has been sent.';

    const otp = await this.otpService.generate(email);
    this.posthog.capturePasswordResetRequested(email);

    // TODO: replace with email service in Step 5
    if (this.config.get<string>('nodeEnv') !== 'production') {
      console.log(`[DEV] OTP for ${email}: ${otp}`);
    }

    return 'If this email is registered, an OTP has been sent.';
  }

  async verifyOtp(email: string, otp: string): Promise<{ verified: boolean }> {
    const result = await this.otpService.verify(email, otp);

    if (!result.valid) {
      const messages: Record<string, string> = {
        TOO_MANY_ATTEMPTS: 'Too many failed attempts. Please request a new OTP.',
        EXPIRED_OR_NOT_FOUND: 'OTP has expired. Please request a new one.',
        INVALID_CODE: 'Invalid OTP. Please check and try again.',
      };
      throw new BadRequestException(messages[result.reason ?? ''] ?? 'OTP verification failed.');
    }

    // Store a short-lived reset gate so set-password can proceed without re-OTP
    await this.redis.set(`pwd_reset:${email}`, '1', PWD_RESET_TTL);

    return { verified: true };
  }

  async setPassword(email: string, otp: string, newPassword: string): Promise<void> {
    const resetGate = await this.redis.get(`pwd_reset:${email}`);

    if (!resetGate) {
      // Gate expired — fall back to OTP direct verification
      const result = await this.otpService.verify(email, otp);
      if (!result.valid) {
        throw new BadRequestException('OTP has expired or is invalid. Please start over.');
      }
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Account not found.');

    const hashed = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await Promise.all([
      this.prisma.user.update({ where: { email }, data: { password: hashed } }),
      this.redis.del(`pwd_reset:${email}`),
      this.tokenService.logoutAll(user.id),
    ]);
    this.posthog.capturePasswordResetCompleted(user.id);
  }
}
