import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store.hooks';
import { setCredentials, clearAuth, setInitializing } from '../auth.slice';
import { tokenStorage } from '@/lib/secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

export function useAuthInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function restoreSession() {
      try {
        const [refreshToken, user] = await Promise.all([
          tokenStorage.getRefreshToken(),
          tokenStorage.getUser(),
        ]);

        if (!refreshToken || !user) {
          dispatch(clearAuth());
          return;
        }

        // Exchange refresh token for a fresh access token
        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (!res.ok) {
          await tokenStorage.clearAll();
          dispatch(clearAuth());
          return;
        }

        const data = await res.json();
        await tokenStorage.saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
        dispatch(setCredentials({ user, tokens: data.tokens }));
      } catch {
        dispatch(clearAuth());
      } finally {
        dispatch(setInitializing(false));
      }
    }

    restoreSession();
  }, [dispatch]);
}
