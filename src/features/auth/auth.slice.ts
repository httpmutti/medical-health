import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthUser, AuthTokens } from './auth.types';

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isInitializing: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthUser; tokens: AuthTokens }>) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.isInitializing = false;
    },

    setTokens(state, action: PayloadAction<AuthTokens>) {
      state.tokens = action.payload;
    },

    clearAuth(state) {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.isInitializing = false;
    },

    setInitializing(state, action: PayloadAction<boolean>) {
      state.isInitializing = action.payload;
    },
  },
});

export const { setCredentials, setTokens, clearAuth, setInitializing } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsInitializing = (state: { auth: AuthState }) => state.auth.isInitializing;
export const selectTokens = (state: { auth: AuthState }) => state.auth.tokens;
