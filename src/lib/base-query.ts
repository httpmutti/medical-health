import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { tokenStorage } from './secure-store';
import { setTokens, clearAuth } from '@/features/auth/auth.slice';
import type { RootState } from '@/store';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers, { getState }) => {
    // Prefer in-memory token from Redux (fastest), fall back to SecureStore
    const stateToken = (getState() as RootState).auth.tokens?.accessToken;
    const token = stateToken ?? (await tokenStorage.getAccessToken());
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// Re-exported so RTK Query uses this everywhere
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Try to refresh using the stored refresh token
    const refreshToken = await tokenStorage.getRefreshToken();
    if (!refreshToken) {
      api.dispatch(clearAuth());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { tokens } = refreshResult.data as { tokens: { accessToken: string; refreshToken: string; expiresIn: number } };
      api.dispatch(setTokens(tokens));
      await tokenStorage.saveTokens(tokens.accessToken, tokens.refreshToken);

      // Retry original request with the new access token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh failed — force logout
      api.dispatch(clearAuth());
      await tokenStorage.clearAll();
    }
  }

  return result;
};
