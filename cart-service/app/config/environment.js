require('dotenv').config();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || 'localhost',
  
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME || 'thsport',
  
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

const missingEnvVars = requiredEnvVars.filter(envVar => !env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    `Please check your .env file and ensure all required variables are set.`
  );
}

module.exports = { env };