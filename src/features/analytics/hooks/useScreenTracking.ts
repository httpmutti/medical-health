import { useEffect } from 'react';
import { usePathname } from 'expo-router';
import { usePostHog } from 'posthog-react-native';

// Maps raw Expo Router pathnames to human-readable screen names
const SCREEN_NAMES: Record<string, string> = {
  '/':                        'Welcome',
  '/(auth)/login':            'Login',
  '/(auth)/login-hello':      'Login Hello',
  '/(auth)/signup':           'Sign Up',
  '/(auth)/forgot-password':  'Forgot Password',
  '/(auth)/verify-otp':       'Verify OTP',
  '/(auth)/set-password':     'Set Password',
  '/(home)':                  'Home',
};

export function useScreenTracking() {
  const pathname = usePathname();
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;
    const name = SCREEN_NAMES[pathname] ?? pathname;
    posthog.screen(name, { path: pathname });
  }, [pathname, posthog]);
}
