<div align="center">
  <br />
    <img src="assets/images/banner.png" alt="Skin Firts — Dermatology Center" width="100%" />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" />
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" />
    <br/>
    <img src="https://img.shields.io/badge/-NestJS-black?style=for-the-badge&logoColor=white&logo=nestjs&color=E0234E" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=336791" />
    <br/>
    <img src="https://img.shields.io/badge/-NativeWind-black?style=for-the-badge&logoColor=38BDF8&logo=tailwindcss&color=0F172A" />
    <img src="https://img.shields.io/badge/-Redux_Toolkit-black?style=for-the-badge&logoColor=white&logo=redux&color=764ABC" />
    <img src="https://img.shields.io/badge/-League_Spartan-black?style=for-the-badge&logoColor=white&logo=googlefonts&color=4285F4" />
  </div>

  <h3 align="center">Skin Firts — Dermatology Center</h3>
  <p align="center">A full-stack dermatology mobile application — Expo frontend + NestJS backend with JWT auth, Redis OTP, and PostHog analytics</p>
</div>

---

## 📋 Table of Contents

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🗂️ [Project Structure](#project-structure)
5. 🎨 [Design System](#design-system)
6. 🔐 [Auth Architecture](#auth-architecture)
7. 🤸 [Quick Start](#quick-start)

---

## <a name="introduction">✨ Introduction</a>

**Skin Firts** is a modern dermatology mobile application built with **Expo SDK 57**, **React Native 0.86**, and **NativeWind v4** on the frontend, and **NestJS**, **Prisma**, and **PostgreSQL** on the backend.

The app connects patients with certified dermatologists — enabling appointment booking, doctor browsing, and skin health management from their phone. The codebase follows a strict **design token architecture** on the frontend and a **module-owned concerns** pattern on the backend: each module owns its own guards, decorators, DTOs, and services.

---

## <a name="tech-stack">⚙️ Tech Stack</a>

### Frontend

| Technology | Purpose |
|---|---|
| **Expo SDK 57 + React Native 0.86** | Cross-platform mobile runtime and build tooling |
| **Expo Router (file-based)** | `(auth)/` and `(home)/` route groups with typed routes |
| **NativeWind v4** | Tailwind CSS utility classes in React Native via `className` |
| **Redux Toolkit + RTK Query** | Global auth state + API layer with automatic token refresh |
| **expo-secure-store** | iOS Keychain / Android Keystore for token and user persistence |
| **PostHog React Native** | Screen tracking and user identification analytics |
| **League Spartan** | Brand typeface — Light, Regular, Medium, SemiBold, Bold |
| **TypeScript (strict)** | End-to-end type safety including navigation params |

### Backend

| Technology | Purpose |
|---|---|
| **NestJS 10** | Modular Node.js framework with DI, guards, interceptors |
| **Prisma 5 + PostgreSQL** | Type-safe ORM with migration-based schema management |
| **ioredis + Upstash** | OTP storage and refresh token blacklist via Redis |
| **nestjs-zod** | Zod-based validation — one schema produces DTO + types + runtime validation |
| **JWT (Access + Refresh)** | 15-minute access tokens, 7-day refresh tokens with rotation and blacklisting |
| **Passport.js** | `jwt-access` and `jwt-refresh` strategies |
| **PostHog Node** | Server-side analytics for auth events |
| **@nestjs/throttler** | Per-route rate limiting |
| **Helmet** | HTTP security headers |

---

## <a name="features">🔋 Features</a>

### Auth Flow

👉 **Register** — Full registration with first name, last name, email, mobile number, and password. Issues access + refresh token pair on success.

👉 **Login** — Email/password with timing-attack prevention (bcrypt runs even for non-existent users). Issues token pair on success.

👉 **Token Rotation** — On every `/auth/refresh`, the old refresh token is blacklisted in Redis and a new pair is issued.

👉 **Auto Token Refresh** — `baseQueryWithReauth` silently refreshes the access token on 401 and retries the original request — no user interaction required.

👉 **Logout** — Sends the refresh token in the request body; backend extracts the `jti`, blacklists it in Redis, and removes it from the database.

👉 **Forgot Password Flow** — Three steps: enter email → verify 6-digit OTP (Redis-backed, 10-minute TTL, max 5 attempts) → set new password.

👉 **Session Restore** — On app restart, tokens and user are read from SecureStore and validated via `/auth/refresh` — no login prompt if session is still valid.

### UI / UX

👉 **OTP Input** — Six individual digit boxes with auto-advance, backspace navigation, and filled-state border highlight.

👉 **Field-level Errors** — Zod validation errors from the backend are mapped to individual field names and displayed inline below each input.

👉 **Coming Soon Modal** — Reusable bottom-sheet modal for social auth buttons (Google, Facebook, Fingerprint) and Terms / Privacy Policy links.

👉 **Skeleton Loading** — Animated pulse skeletons replace spinners on the home screen during data load.

👉 **Design Token System** — All colors, spacing, radius, font families, and text style presets live in a single `tokens.ts`, mirrored 1:1 in `tailwind.config.js`.

---

## <a name="project-structure">🗂️ Project Structure</a>

```
medical-health/
│
├── backend/                              # NestJS API
│   ├── prisma/
│   │   └── schema.prisma                # User + RefreshToken models
│   └── src/
│       ├── types/                        # Centralised backend types
│       │   ├── auth.types.ts            # AuthUser, AuthTokens, JwtPayload
│       │   └── api.types.ts             # ApiErrorResponse
│       ├── config/
│       │   └── configuration.ts         # Typed env config factory
│       ├── common/
│       │   └── filters/
│       │       └── global-exception.filter.ts
│       ├── prisma/
│       │   ├── prisma.service.ts
│       │   └── prisma.module.ts         # @Global()
│       ├── redis/
│       │   ├── redis.service.ts         # ioredis client (TLS auto for Upstash)
│       │   ├── otp.service.ts           # generate / verify / invalidate
│       │   └── redis.module.ts          # @Global()
│       ├── posthog/
│       │   ├── posthog.service.ts       # identify, capture, auth helpers
│       │   └── posthog.module.ts        # @Global()
│       ├── auth/
│       │   ├── guards/
│       │   │   ├── jwt-auth.guard.ts    # Access token guard
│       │   │   └── jwt-refresh.guard.ts # Refresh token guard
│       │   ├── decorators/
│       │   │   └── current-user.decorator.ts
│       │   ├── dto/                     # One file per DTO + barrel index.ts
│       │   ├── services/
│       │   │   ├── auth.service.ts      # register, login
│       │   │   ├── token.service.ts     # issueTokens, refresh, logout, blacklist
│       │   │   └── password.service.ts  # forgotPassword, verifyOtp, setPassword
│       │   ├── strategies/
│       │   │   ├── jwt-access.strategy.ts
│       │   │   └── jwt-refresh.strategy.ts
│       │   ├── auth.controller.ts       # 8 endpoints under /api/v1/auth
│       │   └── auth.module.ts
│       ├── app.controller.ts            # GET /api/v1/health
│       ├── app.module.ts
│       └── main.ts                      # Bootstrap: Helmet, CORS, global prefix
│
└── src/                                 # Expo / React Native app
    ├── app/
    │   ├── (auth)/
    │   │   ├── login.tsx
    │   │   ├── signup.tsx
    │   │   ├── forgot-password.tsx
    │   │   ├── verify-otp.tsx
    │   │   └── set-password.tsx
    │   ├── (home)/
    │   │   └── index.tsx
    │   └── _layout.tsx                  # PostHogProvider → Redux → AuthGuard → Stack
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx               # primary | secondary | tertiary | ghost
    │   │   ├── Typography.tsx           # 6 variants × 5 colors
    │   │   ├── ComingSoonModal.tsx      # Reusable bottom-sheet modal
    │   │   ├── Skeleton.tsx             # Animated pulse skeleton + SkeletonField
    │   │   └── skeletons/
    │   │       ├── AuthFormSkeleton.tsx
    │   │       └── HomeSkeleton.tsx
    │   └── auth/
    │       ├── AuthHeader.tsx
    │       ├── InputField.tsx           # With inline error display
    │       ├── PasswordField.tsx        # With show/hide toggle + inline error
    │       ├── OtpInput.tsx
    │       ├── SocialSection.tsx        # Triggers ComingSoonModal per button
    │       ├── SocialButton.tsx
    │       └── AuthFooter.tsx
    ├── features/
    │   └── auth/
    │       ├── auth.slice.ts            # setCredentials, setTokens, clearAuth, setInitializing
    │       ├── auth.api.ts              # RTK Query: 7 endpoints
    │       ├── auth.types.ts            # Re-exports from @/types
    │       └── hooks/
    │           ├── useAuth.ts           # All auth actions + PostHog calls
    │           ├── useAuthInit.ts       # Session restore from SecureStore
    │           └── useFormError.ts      # Maps RTK error → fieldErrors + globalError
    ├── features/analytics/
    │   └── hooks/
    │       └── useScreenTracking.ts     # posthog.screen() on every route change
    ├── lib/
    │   ├── base-query.ts               # baseQueryWithReauth — auto token refresh on 401
    │   ├── secure-store.ts             # tokenStorage: tokens + user in SecureStore
    │   └── posthog.ts                  # PostHog client init
    ├── store/
    │   ├── index.ts
    │   └── store.hooks.ts              # useAppDispatch, useAppSelector
    ├── types/                           # Centralised frontend types
    │   ├── auth.types.ts               # AuthUser, AuthTokens, AuthState, payloads
    │   └── api.types.ts                # ApiError
    └── theme/
        └── tokens.ts                   # Single source of truth: colors, spacing, radius, fonts, textStyles
```

---

## <a name="design-system">🎨 Design System</a>

### Colors

| Token | Value | Usage |
|---|---|---|
| `primary` | `#2260FF` | Brand blue — buttons, links, active states |
| `secondary` | `#809CFF` | Placeholders, secondary text |
| `tertiary` | `#CAD6FF` | Secondary button bg, skeleton pulse |
| `muted` | `#ECF1FF` | Input field backgrounds, social button bg |
| `white` | `#FFFFFF` | Page backgrounds, inverse text |
| `ink` | `#070707` | Body text, labels |
| `error` | `#EF4444` | Field errors, global error banners |

### Typography

| Preset | Font | Size | Use |
|---|---|---|---|
| `description` | Light | 12px | Body copy, helper text |
| `value` | Medium | 12px | Links, inline actions |
| `subtitle` | Medium | 14px | Section subtitles |
| `label` | Medium | 20px | Input field labels |
| `title` | Medium | 24px | Screen titles |
| `heading` | SemiBold | 24px | Auth header titles |
| `button` | Medium | 24px | Button labels |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `lg` | 16px | Cards, modals |
| `xl` | 20px | Input fields |
| `2xl` | 24px | Large cards |
| `full` | 9999px | Buttons, pills, avatars |

---

## <a name="auth-architecture">🔐 Auth Architecture</a>

```
Register / Login
      │
      ▼
 AuthService ──► TokenService ──► issueTokens()
                                       │
                              ┌────────┴────────┐
                         accessToken        refreshToken
                         (15 min, JWT)      (7d, JWT + stored in DB)
                              │                  │
                         Redux store         SecureStore
                         (fast reads)        (persistence)

On 401 (access token expired):
  baseQueryWithReauth ──► POST /auth/refresh ──► new pair issued
                                                 old jti blacklisted in Redis

On logout:
  accessToken in header (JwtAuthGuard)
  refreshToken in body ──► jti extracted ──► blacklisted in Redis + deleted from DB

On app restart:
  SecureStore ──► refreshToken + user restored ──► POST /auth/refresh
              ──► fresh tokens dispatched to Redux ──► user lands on home
```

---

## <a name="quick-start">🤸 Quick Start</a>

### Prerequisites

- [Node.js](https://nodejs.org/en) 18+
- [pnpm](https://pnpm.io/) — `npm install -g pnpm`
- [PostgreSQL](https://www.postgresql.org/) running locally

### 1. Clone & Install

```bash
git clone https://github.com/httpmutti/medical-health.git
cd medical-health

# Frontend
pnpm install

# Backend
cd backend && npm install
```

### 2. Environment Variables

**Frontend** — create `.env` in the project root:
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
EXPO_PUBLIC_POSTHOG_API_KEY=your_posthog_key
EXPO_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Backend** — create `.env` in `backend/`:
```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://user:password@localhost:5432/skin_firts_db

JWT_ACCESS_SECRET=your_64_byte_hex_secret
JWT_REFRESH_SECRET=your_64_byte_hex_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

REDIS_HOST=your_upstash_host
REDIS_PORT=6379
REDIS_PASSWORD=your_upstash_password

POSTHOG_API_KEY=your_posthog_key
POSTHOG_HOST=https://us.i.posthog.com
```

### 3. Database Setup (first time only)

```bash
psql -U postgres -c "CREATE USER skin_firts_user WITH PASSWORD 'your_password' CREATEDB;"
psql -U postgres -c "CREATE DATABASE skin_firts_db OWNER skin_firts_user;"
```

### 4. Run the Backend

```bash
cd backend
npm run start:dev
# Runs prisma migrate deploy automatically, then starts NestJS on :3000
```

Verify:
```bash
curl http://localhost:3000/api/v1/health
# → { "status": "ok", "db": "connected" }
```

### 5. Run the Frontend

```bash
# From project root
npx expo run:ios      # iOS simulator
npx expo run:android  # Android emulator
```

### 6. Useful Backend Commands

```bash
npm run prisma:migrate   # Create a new migration after schema changes
npm run prisma:studio    # Open Prisma Studio at http://localhost:5555
npm run prisma:generate  # Regenerate Prisma client after schema changes
```

---

<div align="center">
  <p>Built with ❤️ by <strong>httpmutti</strong></p>
  <img src="assets/images/icon.png" width="60" alt="Skin Firts Icon" />
</div>
