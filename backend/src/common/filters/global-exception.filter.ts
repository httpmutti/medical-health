import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { Request, Response } from 'express';
import type { ApiErrorResponse } from '@app-types/api.types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request);

    if (errorResponse.statusCode >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} — ${errorResponse.statusCode}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(`[${request.method}] ${request.url} — ${errorResponse.statusCode} ${errorResponse.error}`);
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, request: Request): ApiErrorResponse {
    const timestamp = new Date().toISOString();
    const path = request.url;

    // Zod validation errors (from nestjs-zod)
    if (exception instanceof ZodValidationException) {
      const zodError = exception.getZodError();
      const fields: Record<string, string> = {};
      zodError.errors.forEach((err) => {
        const key = err.path.join('.');
        fields[key] = err.message;
      });
      return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'VALIDATION_ERROR',
        message: 'Validation failed. Check the fields below.',
        fields,
        timestamp,
        path,
      };
    }

    // NestJS HTTP exceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message ?? exception.message;

      return {
        statusCode: status,
        error: this.statusToErrorCode(status),
        message: Array.isArray(message) ? message[0] : message,
        timestamp,
        path,
      };
    }

    // Unknown / unhandled errors
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred. Please try again later.',
      timestamp,
      path,
    };
  }

  private statusToErrorCode(status: number): string {
    const map: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      410: 'GONE',
      422: 'VALIDATION_ERROR',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
      503: 'SERVICE_UNAVAILABLE',
    };
    return map[status] ?? 'UNKNOWN_ERROR';
  }
}
