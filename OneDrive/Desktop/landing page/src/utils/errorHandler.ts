import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/constants';

/**
 * Custom operational exception class supporting status codes and structured details.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details: any;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR, details: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    // Capture clean trace of execution stack
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Centrally translates backend exceptions into structured HTTP JSON responses.
 */
export function handleApiError(error: any): NextResponse {
  console.error('💥 API Error Intercepted:', error);

  // Operational Errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        statusCode: error.statusCode,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  // Mongoose Validation Failures
  if (error.name === 'ValidationError') {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed for database fields.',
        statusCode: HTTP_STATUS.BAD_REQUEST,
        details: error.errors,
      },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  // Mongoose Unique Key Duplication Failures
  if (error.code === 11000) {
    const duplicateKey = Object.keys(error.keyValue || {})[0] || 'field';
    return NextResponse.json(
      {
        success: false,
        message: `Duplicate resource found: ${duplicateKey} already exists.`,
        statusCode: HTTP_STATUS.CONFLICT,
        details: error.keyValue,
      },
      { status: HTTP_STATUS.CONFLICT }
    );
  }

  // Production-safety fallback
  const isProduction = process.env.NODE_ENV === 'production';
  return NextResponse.json(
    {
      success: false,
      message: isProduction ? 'Internal Server Error' : error.message || 'An unexpected error occurred.',
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      details: isProduction ? null : error.stack,
    },
    { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
  );
}
