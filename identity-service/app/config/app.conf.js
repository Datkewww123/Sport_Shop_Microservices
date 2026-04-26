// Backend/app/config/app.conf.js
// Application configuration

module.exports = {
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development'
  },

  cors: {
    origin: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174,https://thsport-frontend.onrender.com,https://thsports-frontend.onrender.com').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control', 'Pragma', 'Expires'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600
  },

  request: {
    jsonLimit: '50mb',
    urlencodedLimit: '50mb'
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },

  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000,
    maxSize: 100
  },

  pagination: {
    defaultPage: 1,
    defaultLimit: 12,
    maxLimit: 100
  },

  swagger: {
    enabled: true,
    path: '/api-docs'
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'combined'
  }
};
