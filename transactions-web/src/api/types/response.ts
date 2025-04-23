export interface SuccessResponse<T> {
  statusCode: number;
  data: T;
}

export interface ErrorResponse {
  statusCode: number;
  name: string;
  message: string[];
}

export interface CommonResponse<T> {
  success: SuccessResponse<T> | null;
  error: ErrorResponse | null;
}
