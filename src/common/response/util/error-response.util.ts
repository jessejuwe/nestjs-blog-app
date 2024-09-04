import { ErrorResponse } from '../interface/error-response.interface';

export function createErrorResponse(
  error: string,
  message: string,
  statusCode: number,
): ErrorResponse {
  return { error, message, statusCode };
}
