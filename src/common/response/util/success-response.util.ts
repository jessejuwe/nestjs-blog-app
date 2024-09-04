import { SuccessResponse } from '../interface/success-response.interface';

export function createSuccessResponse<T>(
  message: string,
  success: boolean,
  data: T,
): SuccessResponse<T> {
  return { message, success, data };
}
