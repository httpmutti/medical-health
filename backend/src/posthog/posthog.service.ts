import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostHog } from 'posthog-node';

@Injectable()
export class PosthogService implements OnModuleDestroy {
  private readonly client: PostHog;
  private readonly logger = new Logger(PosthogService.name);
  private readonly enabled: boolean;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('posthog.apiKey') ?? '';
    this.enabled = apiKey.length > 0 && apiKey !== 'phc_your_posthog_key';

    this.client = new PostHog(apiKey || 'phc_placeholder', {
      host: this.config.get<string>('posthog.host'),
      flushAt: 20,
      flushInterval: 10000,
    });

    if (!this.enabled) {
      this.client.disable();
      this.logger.warn('PostHog disabled — set POSTHOG_API_KEY to enable analytics.');
    }
  }

  async onModuleDestroy() {
    await this.client.shutdown();
  }

  // ── Identity ─────────────────────────────────────────────────────

  identify(userId: string, properties: Record<string, unknown>) {
    if (!this.enabled) return;
    this.client.identify({ distinctId: userId, properties });
  }

  // ── Event capture ────────────────────────────────────────────────

  capture(userId: string, event: string, properties?: Record<string, unknown>) {
    if (!this.enabled) return;
    this.client.capture({ distinctId: userId, event, properties });
  }

  // ── Feature flags ────────────────────────────────────────────────

  async isFeatureEnabled(flag: string, userId: string): Promise<boolean> {
    if (!this.enabled) return false;
    try {
      return (await this.client.isFeatureEnabled(flag, userId)) ?? false;
    } catch {
      this.logger.warn(`Feature flag check failed for "${flag}"`);
      return false;
    }
  }

  // ── Auth-specific helpers ────────────────────────────────────────

  captureRegister(userId: string, email: string) {
    this.identify(userId, { email });
    this.capture(userId, 'user_registered', { email });
  }

  captureLogin(userId: string, email: string) {
    this.capture(userId, 'user_logged_in', { email });
  }

  captureLogout(userId: string) {
    this.capture(userId, 'user_logged_out');
  }

  captureLogoutAll(userId: string) {
    this.capture(userId, 'user_logged_out_all_devices');
  }

  capturePasswordResetRequested(email: string) {
    // Use email as distinctId before userId is known
    this.capture(email, 'password_reset_requested', { email });
  }

  capturePasswordResetCompleted(userId: string) {
    this.capture(userId, 'password_reset_completed');
  }
}
