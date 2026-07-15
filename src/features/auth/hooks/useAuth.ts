import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { usePostHog } from 'posthog-react-native';
import { useAppDispatch, useAppSelector } from '@/store/store.hooks';
import { setCredentials, clearAuth, selectCurrentUser, selectIsAuthenticated } from '../auth.slice';
import { tokenStorage } from '@/lib/secure-store';
import {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useSetPasswordMutation,
} from '../auth.api';
import type { RegisterPayload, LoginPayload, ForgotPasswordPayload, VerifyOtpPayload, SetPasswordPayload } from '../auth.types';

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const posthog = usePostHog();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [registerMutation, registerState] = useRegisterMutation();
  const [loginMutation, loginState] = useLoginMutation();
  const [logoutMutation, logoutState] = useLogoutMutation();
  const [forgotPasswordMutation, forgotPasswordState] = useForgotPasswordMutation();
  const [verifyOtpMutation, verifyOtpState] = useVerifyOtpMutation();
  const [setPasswordMutation, setPasswordState] = useSetPasswordMutation();

  // ── Register ──────────────────────────────────────────────────

  const register = useCallback(async (payload: RegisterPayload) => {
    const result = await registerMutation(payload).unwrap();
    dispatch(setCredentials({ user: result.user, tokens: result.tokens }));
    await Promise.all([
      tokenStorage.saveTokens(result.tokens.accessToken, result.tokens.refreshToken),
      tokenStorage.saveUser(result.user),
    ]);
    posthog?.identify(result.user.id, {
      email: result.user.email,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
    });
    posthog?.capture('user_registered', { email: result.user.email });
    router.replace('/(home)');
    return result;
  }, [registerMutation, dispatch, router, posthog]);

  // ── Login ─────────────────────────────────────────────────────

  const login = useCallback(async (payload: LoginPayload) => {
    const result = await loginMutation(payload).unwrap();
    dispatch(setCredentials({ user: result.user, tokens: result.tokens }));
    await Promise.all([
      tokenStorage.saveTokens(result.tokens.accessToken, result.tokens.refreshToken),
      tokenStorage.saveUser(result.user),
    ]);
    posthog?.identify(result.user.id, {
      email: result.user.email,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
    });
    posthog?.capture('user_logged_in', { email: result.user.email });
    router.replace('/(home)');
    return result;
  }, [loginMutation, dispatch, router, posthog]);

  // ── Logout ────────────────────────────────────────────────────

  const logout = useCallback(async () => {
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (refreshToken) {
        await logoutMutation({ refreshToken }).unwrap();
      }
    } finally {
      posthog?.capture('user_logged_out');
      posthog?.reset();
      dispatch(clearAuth());
      await tokenStorage.clearAll();
      router.replace('/(auth)/login');
    }
  }, [logoutMutation, dispatch, router, posthog]);

  // ── Forgot password ───────────────────────────────────────────

  const forgotPassword = useCallback(async (payload: ForgotPasswordPayload) => {
    return forgotPasswordMutation(payload).unwrap();
  }, [forgotPasswordMutation]);

  // ── Verify OTP ────────────────────────────────────────────────

  const verifyOtp = useCallback(async (payload: VerifyOtpPayload) => {
    return verifyOtpMutation(payload).unwrap();
  }, [verifyOtpMutation]);

  // ── Set password ──────────────────────────────────────────────

  const setPassword = useCallback(async (payload: SetPasswordPayload) => {
    const result = await setPasswordMutation(payload).unwrap();
    router.replace('/(auth)/login');
    return result;
  }, [setPasswordMutation, router]);

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    forgotPassword,
    verifyOtp,
    setPassword,
    registerState,
    loginState,
    logoutState,
    forgotPasswordState,
    verifyOtpState,
    setPasswordState,
  };
}
