import { useMemo } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { ApiError } from '../auth.types';

type QueryError = FetchBaseQueryError | SerializedError | undefined;

export interface FormErrorResult {
  // Field-level errors: { email: 'Invalid email', password: '...' }
  fieldErrors: Record<string, string>;
  // Top-level message for a toast / alert banner
  globalError: string | null;
}

function isApiError(data: unknown): data is ApiError {
  return typeof data === 'object' && data !== null && 'statusCode' in data;
}

export function useFormError(error: QueryError): FormErrorResult {
  return useMemo(() => {
    if (!error) return { fieldErrors: {}, globalError: null };

    // RTK Query wraps backend responses in { status, data }
    if ('data' in error && isApiError(error.data)) {
      const apiErr = error.data;
      return {
        fieldErrors: apiErr.fields ?? {},
        globalError: apiErr.fields ? null : apiErr.message,
      };
    }

    // Network / serialization errors
    if ('message' in error) {
      return { fieldErrors: {}, globalError: error.message ?? 'Something went wrong.' };
    }

    return { fieldErrors: {}, globalError: 'Something went wrong. Please try again.' };
  }, [error]);
}
