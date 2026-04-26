const { logger } = require('../config/logger');
const { httpStatus } = require('../constants/init');

module.exports = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  const responseError = {
    success: false,
    statusCode: err.statusCode,
    message: err.message || 'Internal Server Error',
    ...(err.errors && { errors: err.errors })
  };

  if (err.name === 'ValidationError') {
    responseError.statusCode = httpStatus.BAD_REQUEST;
    responseError.message = 'Dữ liệu không hợp lệ';
    responseError.errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  if (err.code === 11000) {
    responseError.statusCode = httpStatus.CONFLICT;
    const field = Object.keys(err.keyPattern)[0];
    responseError.message = `${field} đã tồn tại`;
  }

  if (err.name === 'CastError') {
    responseError.statusCode = httpStatus.BAD_REQUEST;
    responseError.message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.name === 'JsonWebTokenError') {
    responseError.statusCode = httpStatus.UNAUTHORIZED;
    responseError.message = 'Token không hợp lệ';
  }

  if (err.name === 'TokenExpiredError') {
    responseError.statusCode = httpStatus.UNAUTHORIZED;
    responseError.message = 'Token đã hết hạn';
  }

  logger.error(`[ERROR] ${req.method} ${req.url} - ${responseError.statusCode}`, {
    message: err.message,
    stack: err.stack,
    statusCode: responseError.statusCode,
    ...(req.user && { 
      userId: req.user.id,
      userRole: req.user.role 
    }),
    ...(req.body && Object.keys(req.body).length > 0 && { 
      body: req.body 
    })
  });

  if (process.env.NODE_ENV === 'development') {
    responseError.stack = err.stack;
  }

  res.status(responseError.statusCode).json(responseError);
};