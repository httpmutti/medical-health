// Mirrors backend GlobalExceptionFilter response shape exactly
export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
  fields?: Record<string, string>;
  timestamp: string;
  path: string;
}
