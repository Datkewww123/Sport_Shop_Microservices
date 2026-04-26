// Backend/app/middleware/ErrorHandler.middleware.js
// Global error handler middleware

const { httpStatus, messages } = require('../constants/init');
const ResponseHelper = require('../helpers/response.helper');

class ErrorHandler {
  static handle(err, req, res, next) {
    const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || messages.INTERNAL_ERROR;

    console.error(`[ERROR] ${message}`, err);

    ResponseHelper.error(res, message, status, {
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}

module.exports = ErrorHandler;
