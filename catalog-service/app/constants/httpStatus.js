// Backend/app/constants/httpStatus.js
// HTTP Status Code Constants

/**
 * HTTP Status Codes
 * Sử dụng constants thay vì hardcode numbers
 * Giúp code dễ đọc và maintain hơn
 */
module.exports = {
  // ============================================
  // 2xx SUCCESS
  // ============================================
  OK: 200,                    // Request thành công
  CREATED: 201,               // Resource được tạo thành công
  ACCEPTED: 202,              // Request được chấp nhận xử lý
  NO_CONTENT: 204,            // Thành công nhưng không có content trả về
  
  // ============================================
  // 3xx REDIRECTION
  // ============================================
  MOVED_PERMANENTLY: 301,     // Resource đã chuyển vĩnh viễn
  FOUND: 302,                 // Redirect tạm thời
  NOT_MODIFIED: 304,          // Resource không thay đổi (cache)
  
  // ============================================
  // 4xx CLIENT ERRORS
  // ============================================
  BAD_REQUEST: 400,           // Request không hợp lệ (validation error)
  UNAUTHORIZED: 401,          // Chưa đăng nhập hoặc token không hợp lệ
  PAYMENT_REQUIRED: 402,      // Yêu cầu thanh toán
  FORBIDDEN: 403,             // Không có quyền truy cập
  NOT_FOUND: 404,             // Resource không tồn tại
  METHOD_NOT_ALLOWED: 405,    // HTTP method không được phép
  NOT_ACCEPTABLE: 406,        // Server không thể tạo response phù hợp
  REQUEST_TIMEOUT: 408,       // Request timeout
  CONFLICT: 409,              // Conflict với state hiện tại (duplicate key)
  GONE: 410,                  // Resource đã bị xóa vĩnh viễn
  PAYLOAD_TOO_LARGE: 413,     // Request body quá lớn
  UNSUPPORTED_MEDIA_TYPE: 415,// Content-Type không được hỗ trợ
  UNPROCESSABLE_ENTITY: 422,  // Validation error (semantic error)
  TOO_MANY_REQUESTS: 429,     // Rate limit exceeded
  
  // ============================================
  // 5xx SERVER ERRORS
  // ============================================
  INTERNAL_SERVER_ERROR: 500, // Lỗi server không xác định
  NOT_IMPLEMENTED: 501,       // Chức năng chưa được implement
  BAD_GATEWAY: 502,           // Gateway/proxy error
  SERVICE_UNAVAILABLE: 503,   // Server tạm thời không khả dụng
  GATEWAY_TIMEOUT: 504        // Gateway/proxy timeout
};
