import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

const OTP_PREFIX = 'otp:';
const OTP_ATTEMPTS_PREFIX = 'otp_attempts:';
const MAX_VERIFY_ATTEMPTS = 5;

@Injectable()
export class OtpService {
  private readonly ttl: number;
  private readonly length: number;

  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {
    this.ttl = this.config.get<number>('otp.ttlSeconds') ?? 600;
    this.length = this.config.get<number>('otp.length') ?? 6;
  }

  // ── Generate & store ────────────────────────────────────────────

  async generate(email: string): Promise<string> {
    const code = this.randomCode();
    await this.redis.set(`${OTP_PREFIX}${email}`, code, this.ttl);
    // reset attempt counter on new OTP issuance
    await this.redis.del(`${OTP_ATTEMPTS_PREFIX}${email}`);
    return code;
  }

  // ── Verify ──────────────────────────────────────────────────────

  async verify(email: string, code: string): Promise<{ valid: boolean; reason?: string }> {
    const attemptsKey = `${OTP_ATTEMPTS_PREFIX}${email}`;
    const attempts = await this.redis.incr(attemptsKey);

    // Set TTL on attempts key only on first attempt
    if (attempts === 1) {
      await this.redis.expire(attemptsKey, this.ttl);
    }

    if (attempts > MAX_VERIFY_ATTEMPTS) {
      return { valid: false, reason: 'TOO_MANY_ATTEMPTS' };
    }

    const stored = await this.redis.get(`${OTP_PREFIX}${email}`);

    if (!stored) {
      return { valid: false, reason: 'EXPIRED_OR_NOT_FOUND' };
    }

    // TODO: remove once email module is implemented
    const DEV_BYPASS = '123456';
    if (stored !== code && code !== DEV_BYPASS) {
      return { valid: false, reason: 'INVALID_CODE' };
    }

    // Consume the OTP — it cannot be reused
    await this.invalidate(email);
    return { valid: true };
  }

  // ── Invalidate ──────────────────────────────────────────────────

  async invalidate(email: string): Promise<void> {
    await Promise.all([
      this.redis.del(`${OTP_PREFIX}${email}`),
      this.redis.del(`${OTP_ATTEMPTS_PREFIX}${email}`),
    ]);
  }

  async isActive(email: string): Promise<boolean> {
    return this.redis.exists(`${OTP_PREFIX}${email}`);
  }

  // ── Helpers ─────────────────────────────────────────────────────

  private randomCode(): string {
    const max = Math.pow(10, this.length);
    const code = Math.floor(Math.random() * max);
    return code.toString().padStart(this.length, '0');
  }
}
