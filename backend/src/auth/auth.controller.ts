import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, VerifyOtpDto, SetPasswordDto, RefreshTokenDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  // POST /api/v1/auth/register
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);
    return { message: 'Account created successfully.', ...result };
  }

  // POST /api/v1/auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return { message: 'Logged in successfully.', ...result };
  }

  // POST /api/v1/auth/refresh
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  async refresh(@CurrentUser() user: any) {
    const tokens = await this.tokenService.refresh(user.userId, user.jti);
    return { message: 'Tokens refreshed.', tokens };
  }

  // POST /api/v1/auth/logout
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: any, @Body() dto: RefreshTokenDto) {
    await this.tokenService.logoutByRefreshToken(user.userId, dto.refreshToken);
    return { message: 'Logged out successfully.' };
  }

  // POST /api/v1/auth/logout-all
  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logoutAll(@CurrentUser('userId') userId: string) {
    await this.tokenService.logoutAll(userId);
    return { message: 'Logged out from all devices.' };
  }

  // POST /api/v1/auth/forgot-password
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const message = await this.passwordService.forgotPassword(dto.email);
    return { message };
  }

  // POST /api/v1/auth/verify-otp
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    const result = await this.passwordService.verifyOtp(dto.email, dto.otp);
    return { message: 'OTP verified successfully.', ...result };
  }

  // POST /api/v1/auth/set-password
  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async setPassword(@Body() dto: SetPasswordDto) {
    await this.passwordService.setPassword(dto.email, dto.otp, dto.password);
    return { message: 'Password updated successfully. Please log in again.' };
  }
}
