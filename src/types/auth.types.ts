// ── Domain models ────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ── Redux slice state ────────────────────────────────────────────

export interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

// ── Request payloads ─────────────────────────────────────────────

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface SetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

// ── Response shapes ──────────────────────────────────────────────

export interface AuthResponse {
  message: string;
  user: AuthUser;
  tokens: AuthTokens;
}

export interface MessageResponse {
  message: string;
}

export interface VerifyOtpResponse {
  message: string;
  verified: boolean;
}
