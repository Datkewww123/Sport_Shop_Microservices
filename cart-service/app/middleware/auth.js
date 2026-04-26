const jwt = require('jsonwebtoken');
const { env } = require('../config/environment');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../constants/init');

module.exports = (req, res, next) => {
  let token = req.cookies?.accessToken;
  
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