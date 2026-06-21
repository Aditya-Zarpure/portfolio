import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/constants';

interface SuccessResponse<T> {
  success: true;
  message: string;
  statusCode: number;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  details: any;
}

/**
 * Standardized success response helper.
 */
export function sendSuccess<T>(
  data: T,
  message = 'Request completed successfully.',
  statusCode: number = HTTP_STATUS.OK
): NextResponse {
  const payload: SuccessResponse<T> = {
    success: true,
    message,
    statusCode,
    data,
  };
  return NextResponse.json(payload, { status: statusCode });
}

/**
 * Standardized managed error response helper.
 */
export function sendError(
  message = 'Transaction failed.',
  statusCode = HTTP_STATUS.BAD_REQUEST,
  details: any = null
): NextResponse {
  const payload: ErrorResponse = {
    success: false,
    message,
    statusCode,
    details,
  };
  return NextResponse.json(payload, { status: statusCode });
}
