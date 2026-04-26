// Backend/server.js
// Main server entry point

require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

// Import config
const { app: appConfig } = require('./app/config/init');
const { env } = require('./app/config/environment');
const { logger } = require('./app/config/logger');

// Import database
const database = require('./app/database/init');

// Import middleware
const middlewareInit = require('./app/middleware/init');
const { requestLogger, notFoundLogger, errorLogger } = require('./app/middleware/loggingMiddleware');
const errorHandler = require('./app/middleware/errorHandler');

// Import routes
const appRoutes = require('./app/routes/App.routes');

// Import swagger
const swaggerSpec = require('./app/config/swagger');

// Create Express app
const app = express();

// ============================================
// MIDDLEWARE SETUP (ĐÚNG THỨ TỰ)
// ============================================

// 1. Trust proxy (nếu dùng reverse proxy như nginx)
app.set('trust proxy', 1);

// 2. Cookie parser (phải đặt trước middleware khác cần đọc cookies)
app.use(cookieParser());

// 3. Initialize other middleware (CORS, body parser, etc.)
middlewareInit(app);

// 4. Request logging (sau body parser để log được body)
app.use(requestLogger);

// ============================================
// HEALTH CHECK & ROOT ENDPOINTS
// ============================================

// Health check endpoint (không cần auth)
app.get('/api/health', (req, res) => {
  const dbStatus = database.mongodb.getStatus();
  
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: dbStatus
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to TH Sport API',
    version: '1.0.0',
    documentation: process.env.NODE_ENV === 'production' ? 'https://thsport-backend.onrender.com/api-docs' : `http://localhost:${appConfig.server.port}/api-docs`
  });
});

// ============================================
// API DOCUMENTATION
// ============================================

// Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'TH Sport API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      withCredentials: true  // Để Swagger UI có thể gửi cookies
    }
  })
);

// ============================================
// API ROUTES
// ============================================

// Register API routes
app.use('/api', appRoutes);

// ============================================
// ERROR HANDLERS (CUỐI CÙNG)
// ============================================

// 404 handler - phải sau tất cả routes
app.use(notFoundLogger);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found'
  });
});

// Error logging middleware
app.use(errorLogger);

// Global error handler - phải là middleware cuối cùng
app.use(errorHandler);

// ============================================
// SERVER INITIALIZATION
// ============================================

let server;

/**
 * Start Express server
 */
async function startServer() {
  try {
    // Connect to database
    logger.info('\nInitializing database...');
    await database.init();

    // Start listening
    server = app.listen(appConfig.server.port, appConfig.server.host, () => {
      logger.info(`\nServer running on http://${appConfig.server.host}:${appConfig.server.port}`);
      const docsUrl = process.env.NODE_ENV === 'production' ? 'https://thsport-backend.onrender.com/api-docs' : `http://${appConfig.server.host}:${appConfig.server.port}/api-docs`;
      logger.info(`API Documentation: ${docsUrl}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`Logs directory: logs/`);
      logger.info('\nServer is ready to accept requests\n');
    });
  } catch (error) {
    logger.error('✗ Failed to start server:', { error: error.message, stack: error.stack });
    process.exit(1);
  }
}

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

/**
 * Graceful shutdown handler
 * Đảm bảo đóng kết nối database và cleanup resources
 */
const gracefulShutdown = async (signal) => {
  logger.info(`\n\n${signal} received: Shutting down gracefully...`);
  
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
      
      try {
        await database.close();
        logger.info('Database connection closed');
        logger.info('Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        logger.error('✗ Error during shutdown:', { error: error.message });
        process.exit(1);
      }
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

// Handle process signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Start the server
startServer();

module.exports = app;
