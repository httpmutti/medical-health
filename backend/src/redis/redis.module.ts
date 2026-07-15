import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { OtpService } from './otp.service';

@Global()
@Module({
  providers: [RedisService, OtpService],
  exports: [RedisService, OtpService],
})
export class RedisModule {}
