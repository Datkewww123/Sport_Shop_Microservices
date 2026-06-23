require('dotenv').config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3003,

  MYSQL_HOST:     process.env.MYSQL_HOST || 'mysql',
  MYSQL_PORT:     process.env.MYSQL_PORT || 3306,
  MYSQL_USER:     process.env.MYSQL_USER || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'rootpassword',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'soap_order_db',

  JWT_SECRET:     process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',

  INTERNAL_API_KEY: process.env.INTERNAL_API_KEY || 'internal123',
  FRONTEND_URL:     process.env.FRONTEND_URL || 'http://localhost:5173',
  CORS_ORIGIN:      process.env.CORS_ORIGIN  || 'http://localhost:5173',

  CATALOG_SERVICE_URL:  process.env.CATALOG_SERVICE_URL  || 'http://catalog-service:3002',
  IDENTITY_SERVICE_URL: process.env.IDENTITY_SERVICE_URL || 'http://identity-service:3001',
  PAYMENT_SERVICE_URL:  process.env.PAYMENT_SERVICE_URL  || 'http://payment-service:3004',
  REDIS_URL:            process.env.REDIS_URL            || 'redis://redis:6379',
};

const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !env[envVar]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

module.exports = { env };