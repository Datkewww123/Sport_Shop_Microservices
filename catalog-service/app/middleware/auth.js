// Backend/app/middleware/auth.js
// Authentication Middleware

const jwt = require('jsonwebtoken');
const { env } = require('../config/environment');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../constants/init');

/**
 * Middleware xác thực JWT token
 * Hỗ trợ cả HTTP-only cookie và Authorization header
 * 
 * Quy trình:
 * 1. Đọc token từ cookie (ưu tiên, bảo mật hơn) hoặc header
 * 2. Verify token với JWT_SECRET
 * 3. Gắn user info vào req.user
 * 4. Cho phép request tiếp tục
 * 
 * @throws {ApiError} 401 - Không có token hoặc token không hợp lệ
 */
module.exports = (req, res, next) => {
  // Ưu tiên đọc token từ HTTP-only cookie (bảo mật hơn)
  let token = req.cookies?.accessToken;
  
  // Fallback: Đọc từ Authorization header để tương thích ngược
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Vui lòng đăng nhập để tiếp tục'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token đã hết hạn, vui lòng đăng nhập lại'));
    }
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token không hợp lệ'));
  }
};
