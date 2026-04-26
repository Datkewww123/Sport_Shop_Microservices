// Backend/app/middleware/loggingMiddleware.js
// Request/Response Logging Middleware

const { logger } = require('../config/logger');

/**
 * Làm sạch request body trước khi log
 * Ẩn thông tin nhạy cảm như password, token
 */
const sanitizeBody = (body) => {
  if (!body || typeof body !== 'object') return body;
  
  const sanitized = { ...body };
  const sensitiveFields = ['password', 'token', 'refreshToken', 'accessToken', 'currentPassword', 'newPassword'];
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '***HIDDEN***';
    }
  });
  
  return sanitized;
};

/**
 * Middleware log HTTP requests/responses
 * Ghi lại chi tiết request và response để debug
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  const { method, url, ip, headers } = req;
  const userAgent = headers['user-agent'] || 'Unknown';
  const origin = headers.origin || headers.referer || 'Direct';
  const realIp = headers['x-forwarded-for'] || headers['x-real-ip'] || ip;
  
  // Phân loại request type
  const isApiRequest = url.startsWith('/api');
  const isDocsRequest = url.startsWith('/api-docs');
  const isOptionsRequest = method === 'OPTIONS';
  
  // Log incoming request
  const prefix = isOptionsRequest ? 'OPTIONS' : isApiRequest ? 'API' : isDocsRequest ? 'DOCS' : 'REQUEST';
  
  logger.http(`[${prefix}] INCOMING ${method} ${url}`, {
    ip: realIp,
    userAgent,
    origin,
    query: Object.keys(req.query).length > 0 ? req.query : undefined,
    params: Object.keys(req.params).length > 0 ? req.params : undefined,
    // Chỉ log body cho các method có body
    ...((['POST', 'PUT', 'PATCH'].includes(method)) && req.body && {
      body: sanitizeBody(req.body)
    })
  });

  // Hook vào response finish event
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { statusCode } = res;
    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'http';
    
    // Status indicator
    let statusText;
    if (statusCode >= 500) statusText = 'ERROR';
    else if (statusCode === 404) statusText = 'NOT_FOUND';
    else if (statusCode >= 400) statusText = 'WARN';
    else if (statusCode === 304) statusText = 'CACHED';
    else if (statusCode === 204) statusText = 'NO_CONTENT';
    else if (statusCode >= 200) statusText = 'SUCCESS';
    else statusText = 'INFO';
    
    logger[logLevel](`[${statusText}] RESPONSE ${method} ${url} - ${statusCode}`, {
      statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('content-length') || '0',
      // Log user nếu có authentication
      ...(req.user && {
        userId: req.user.id,
        userRole: req.user.role
      })
    });
  });

  // Hook vào error event
  res.on('error', (error) => {
    const duration = Date.now() - startTime;
    logger.error(`[ERROR] ${method} ${url}`, {
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`
    });
  });

  next();
};

/**
 * Middleware log 404 errors
 */
const notFoundLogger = (req, res, next) => {
  logger.warn(`[404] Not Found: ${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });
  next();
};

/**
 * Middleware log errors trước khi xử lý
 */
const errorLogger = (err, req, res, next) => {
  logger.error(`[ERROR] Error in ${req.method} ${req.url}`, {
    error: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    ...(req.user && { userId: req.user.id })
  });
  next(err);
};

module.exports = {
  requestLogger,
  notFoundLogger,
  errorLogger
};
