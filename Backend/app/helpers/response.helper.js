// Backend/app/helpers/response.helper.js
// API Response Helper

const { httpStatus } = require('../constants/init');

/**
 * Response Helper class
 * Chuẩn hóa format response cho toàn bộ API
 * 
 * Tất cả response đều có format:
 * {
 *   success: boolean,
 *   statusCode: number,
 *   message: string,
 *   data: any,
 *   pagination: object (optional)
 * }
 */
class ResponseHelper {
  /**
   * Success response
   * @param {Object} res - Express response object
   * @param {any} data - Response data
   * @param {string} message - Success message
   * @param {number} statusCode - HTTP status code (default: 200)
   */
  static success(res, data = null, message = 'Success', statusCode = httpStatus.OK) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data
    });
  }

  /**
   * Created response (201)
   * @param {Object} res - Express response object
   * @param {any} data - Created resource data
   * @param {string} message - Success message
   */
  static created(res, data = null, message = 'Created successfully') {
    return this.success(res, data, message, httpStatus.CREATED);
  }

  /**
   * No content response (204)
   * @param {Object} res - Express response object
   * @param {string} message - Message
   */
  static noContent(res, message = 'No content') {
    return res.status(httpStatus.NO_CONTENT).json({
      success: true,
      statusCode: httpStatus.NO_CONTENT,
      message
    });
  }

  /**
   * Error response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {Array|null} errors - Validation errors
   */
  static error(res, message = 'Error', statusCode = httpStatus.INTERNAL_SERVER_ERROR, errors = null) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      ...(errors && { errors })
    });
  }

  /**
   * Paginated response
   * @param {Object} res - Express response object
   * @param {Array} items - Array of items
   * @param {Object} pagination - Pagination info
   * @param {string} message - Success message
   */
  static paginated(res, items, pagination, message = 'Success') {
    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message,
      data: items,
      pagination
    });
  }

  /**
   * Validation error response (422)
   * @param {Object} res - Express response object
   * @param {Array} errors - Validation errors
   * @param {string} message - Error message
   */
  static validationError(res, errors, message = 'Validation failed') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      success: false,
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message,
      errors
    });
  }

  /**
   * Unauthorized response (401)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static unauthorized(res, message = 'Unauthorized') {
    return this.error(res, message, httpStatus.UNAUTHORIZED);
  }

  /**
   * Forbidden response (403)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static forbidden(res, message = 'Forbidden') {
    return this.error(res, message, httpStatus.FORBIDDEN);
  }

  /**
   * Not found response (404)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static notFound(res, message = 'Not found') {
    return this.error(res, message, httpStatus.NOT_FOUND);
  }

  /**
   * Bad request response (400)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {Array|null} errors - Errors
   */
  static badRequest(res, message = 'Bad request', errors = null) {
    return this.error(res, message, httpStatus.BAD_REQUEST, errors);
  }

  /**
   * Conflict response (409)
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static conflict(res, message = 'Conflict') {
    return this.error(res, message, httpStatus.CONFLICT);
  }
}

module.exports = ResponseHelper;
