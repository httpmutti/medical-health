<div align="center">
  <br />
    <img src="assets/images/banner.png" alt="Skin Firts — Dermatology Center" width="100%" />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" />
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" />
    <br/>
    <img src="https://img.shields.io/badge/-NativeWind-black?style=for-the-badge&logoColor=38BDF8&logo=tailwindcss&color=0F172A" />
    <img src="https://img.shields.io/badge/-Expo_Router-black?style=for-the-badge&logoColor=white&logo=expo&color=1C1C1E" />
    <img src="https://img.shields.io/badge/-League_Spartan-black?style=for-the-badge&logoColor=white&logo=googlefonts&color=4285F4" />
  </div>

  <h3 align="center">Skin Firts — Dermatology Center</h3>
  <p align="center">A pixel-perfect, design-token-driven dermatology mobile app built with Expo & NativeWind</p>
</div>

---

## 📋 Table of Contents

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🗂️ [Project Structure](#project-structure)
5. 🎨 [Design System](#design-system)
6. 🤸 [Quick Start](#quick-start)

---

## <a name="introduction">✨ Introduction</a>

**Skin Firts** is a modern dermatology mobile application built with **Expo SDK 57**, **React Native 0.86**, and **NativeWind v4**. The app connects patients with certified dermatologists, enabling them to book appointments, browse doctor profiles, and manage their skin health — all from the comfort of their phone.

The codebase follows a strict **design token architecture** — every color, font size, spacing value, and border radius is defined once in `tokens.ts` and mirrored in `tailwind.config.js`, ensuring a pixel-perfect, consistent UI across the entire app.

---

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Expo](https://expo.dev/)**  
  Managed workflow with SDK 57. Provides the runtime, build tooling, and native module ecosystem. Uses `expo-router` for file-based navigation and `expo-splash-screen` for a polished launch experience.

- **[React Native](https://reactnative.dev/)**  
  Version 0.86 with React 19. Powers the cross-platform native UI, giving access to native components, gestures, and animations.

- **[Expo Router](https://expo.github.io/router/)**  
  File-based routing built on top of React Navigation. Routes are co-located with screens using `(auth)/` and `(tabs)/` group conventions.

- **[NativeWind v4](https://www.nativewind.dev/)**  
  Brings Tailwind CSS utility classes to React Native. All styling is done via `className` with a fully custom design token config — no hardcoded colors or sizes anywhere in components.

- **[TypeScript](https://www.typescriptlang.org/)**  
  Strict mode enabled throughout. All design tokens, component props, and navigation params are fully typed.

- **[League Spartan](https://fonts.google.com/specimen/League+Spartan)**  
  The app's sole typeface, loaded via `@expo-google-fonts/league-spartan`. Used across five weights: Light, Regular, Medium, SemiBold, and Bold — each mapped to a named text style preset in `tokens.ts`.

- **[React Native SVG](https://github.com/software-mansion/react-native-svg)**  
  Renders all icons and the brand logo as crisp vector graphics at any resolution.

- **[React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)**  
  Handles notch, Dynamic Island, and home indicator insets reliably across all devices.

---

## <a name="features">🔋 Features</a>

👉 **Welcome Screen** — Brand logo centered on screen with a tagline and two CTA buttons navigating to Login and Sign Up.

👉 **Log In** — Email/password login with "Forget Password" link, social sign-in (Google, Facebook, Fingerprint), and a "Sign Up" footer link.

👉 **Sign Up** — Full registration form with name, email, password, mobile number, date of birth, and terms & privacy policy agreement.

👉 **Forgot Password Flow** — Three-step recovery: enter email → verify 6-digit OTP → set new password.

👉 **OTP Verification** — Six individual digit boxes with auto-advance, backspace navigation, filled-state border highlight, and a "Resend" link.

👉 **Set Password** — Dual password fields with show/hide toggle using Expo's Ionicons.

👉 **Design Token System** — All colors, radii, spacing, font families, and text style presets live in a single `tokens.ts` file, mirrored 1:1 in `tailwind.config.js`.

👉 **Reusable Component Library** — `Button` (primary / secondary / tertiary / ghost), `Typography` (6 variants × 5 colors), `InputField`, `PasswordField`, `OtpInput`, `AuthHeader`, `SocialSection`, `AuthFooter`.

👉 **Zero Hardcoded Values in Components** — All colors reference `colors.*` from tokens; all typography references `textStyles.*`; layout uses Tailwind spacing tokens.

---

## <a name="project-structure">🗂️ Project Structure</a>

```
medical-health/
├── assets/
│   ├── icons/
│   │   ├── ui/                    # Logo SVGs (primary, white, with-text)
│   │   ├── social/                # Google, Facebook, Fingerprint SVGs
│   │   └── icons.ts               # Barrel export for all icons
│   └── images/                    # App icons, splash, banner
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx        # Auth stack navigator
│   │   │   ├── login.tsx          # Log In screen
│   │   │   ├── login-hello.tsx    # Log In (Hello variant)
│   │   │   ├── signup.tsx         # Sign Up screen
│   │   │   ├── forgot-password.tsx
│   │   │   ├── verify-otp.tsx
│   │   │   └── set-password.tsx
│   │   ├── _layout.tsx            # Root layout + font loading
│   │   └── index.tsx              # Welcome screen
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx         # primary | secondary | tertiary | ghost
│   │   │   ├── Typography.tsx     # description | value | subtitle | label | title | heading
│   │   │   └── index.ts
│   │   └── auth/
│   │       ├── AuthHeader.tsx     # Back arrow + centered title
│   │       ├── InputField.tsx     # Labelled text input
│   │       ├── PasswordField.tsx  # Password input with eye toggle
│   │       ├── OtpInput.tsx       # 6-box OTP input with auto-advance
│   │       ├── SocialButton.tsx   # Circular social icon button
│   │       ├── SocialSection.tsx  # "or sign up with" + icon row
│   │       ├── AuthFooter.tsx     # "Don't have an account? Sign Up"
│   │       └── index.ts
│   └── theme/
│       └── tokens.ts              # Single source of truth: colors, spacing, radius, fonts, textStyles
├── global.css                     # Tailwind directives for NativeWind
├── tailwind.config.js             # Mirrors tokens.ts exactly
└── metro.config.js                # withNativeWind wrapper
```

---

## <a name="design-system">🎨 Design System</a>

### Colors

| Token | Class | Value | Usage |
|---|---|---|---|
| `primary` | `bg-primary` / `text-primary` | `#2260FF` | Brand blue, buttons, links |
| `secondary` | `bg-secondary` / `text-secondary` | `#809CFF` | Input text, placeholders |
| `tertiary` | `bg-tertiary` / `text-tertiary` | `#CAD6FF` | Secondary button bg |
| `muted` | `bg-muted` | `#ECF1FF` | Input field backgrounds |
| `white` | `bg-white` / `text-white` | `#FFFFFF` | Page backgrounds, inverse text |
| `ink` | `bg-ink` / `text-ink` | `#070707` | Body text, labels |

### Typography

| Preset | Font | Size | Use |
|---|---|---|---|
| `description` | Light | 12px | Body copy, helper text |
| `value` | Medium | 12px | Links, "Forget Password" |
| `subtitle` | Medium | 14px | Section subtitles |
| `label` | Medium | 20px | Input field labels |
| `title` | Medium | 24px | Screen titles ("Welcome") |
| `heading` | SemiBold | 24px | Auth header titles |
| `button` | Medium | 24px | Button labels |

### Border Radius

| Token | Value | Class |
|---|---|---|
| `lg` | 16px | `rounded-lg` |
| `xl` | 20px | `rounded-xl` |
| `2xl` | 24px | `rounded-2xl` |
| `full` | 9999px | `rounded-full` |

---

## <a name="quick-start">🤸 Quick Start</a>

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) 18+
- [pnpm](https://pnpm.io/) — `npm install -g pnpm`
- [Expo Go](https://expo.dev/go) on your device **or** a simulator

> ⚠️ This project uses **Expo SDK 57 + React 19 + React Native 0.86** which require a **development build** — Expo Go is not supported.

### Clone the Repository

```bash
git clone https://github.com/httpmutti/medical-health.git
cd medical-health
```

### Install Dependencies

```bash
pnpm install
```

### Run on iOS Simulator

```bash
npx expo run:ios
```

### Run on Android Emulator

```bash
npx expo run:android
```

### Start Metro (after a native build exists)

```bash
npx expo start --clear
```

---

<div align="center">
  <p>Built with ❤️ by <strong>httpmutti</strong></p>
  <img src="assets/images/icon.png" width="60" alt="Skin Firts Icon" />
</div>
