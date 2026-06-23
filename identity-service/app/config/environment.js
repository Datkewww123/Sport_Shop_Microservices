require('dotenv').config();

const env = {
  // APPLICATION
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  HOST: process.env.HOST || 'localhost',

  // MYSQL (thay thế MongoDB)
  MYSQL_HOST: process.env.MYSQL_HOST || 'mysql',
  MYSQL_PORT: process.env.MYSQL_PORT || 3306,
  MYSQL_USER: process.env.MYSQL_USER || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'rootpassword',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'soap_identity_db',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',

  // FRONTEND
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',

  // INTERNAL
  INTERNAL_API_KEY: process.env.INTERNAL_API_KEY || 'internal123',

  // SERVICE URLS
  CATALOG_SERVICE_URL: process.env.CATALOG_SERVICE_URL || 'http://catalog-service:3002',
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || 'http://order-service:3003',
};

// Validate — chỉ còn JWT_SECRET là bắt buộc
const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !env[envVar]);
if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    `Please check your .env file and ensure all required variables are set.`
  );
}

module.exports = { env };