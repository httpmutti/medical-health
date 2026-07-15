import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/lib/base-query';
import type {
  AuthResponse,
  MessageResponse,
  VerifyOtpResponse,
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  VerifyOtpPayload,
  SetPasswordPayload,
} from './auth.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),

    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),

    logout: builder.mutation<MessageResponse, { refreshToken: string }>({
      query: (body) => ({ url: '/auth/logout', method: 'POST', body }),
    }),

    logoutAll: builder.mutation<MessageResponse, void>({
      query: () => ({ url: '/auth/logout-all', method: 'POST' }),
    }),

    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordPayload>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: (body) => ({ url: '/auth/verify-otp', method: 'POST', body }),
    }),

    setPassword: builder.mutation<MessageResponse, SetPasswordPayload>({
      query: (body) => ({ url: '/auth/set-password', method: 'POST', body }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLogoutAllMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useSetPasswordMutation,
} = authApi;
