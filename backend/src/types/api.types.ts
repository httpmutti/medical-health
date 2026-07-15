export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  fields?: Record<string, string>;
  timestamp: string;
  path: string;
}
