// Backend/app/utils/ApiError.js
// Custom Error class cho API responses

/**
 * Custom Error class cho API
 * 
 * Mục đích:
 * - Tạo lỗi chuẩn với HTTP status code
 * - Dễ dàng throw error với statusCode và message
 * - errorHandlingMiddleware sẽ bắt và format response
 * 
 * Cách sử dụng:
 * throw new ApiError(404, 'Product not found')
 * throw new ApiError(401, 'Invalid credentials')
 * throw new ApiError(422, 'Validation failed', [{ field: 'email', message: 'Invalid email' }])
 * 
 * Kết quả response:
 * {
 *   "success": false,
 *   "statusCode": 404,
 *   "message": "Product not found",
 *   "errors": [...],
 *   "stack": "..." // Chỉ hiển thị ở DEV mode
 * }
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {Array|null} errors - Validation errors array (optional)
   */
  constructor(statusCode, message, errors = null) {
    super(message);
    
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
