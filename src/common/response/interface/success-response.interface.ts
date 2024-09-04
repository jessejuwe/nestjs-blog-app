export interface SuccessResponse<T> {
  message: string;
  success: boolean;
  data: T;
}
