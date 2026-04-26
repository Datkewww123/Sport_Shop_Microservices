// Backend/app/config/environment.js
// Centralized Environment Configuration

require('dotenv').config();

/**
 * Centralized environment variables
 * Tất cả services/configs khác import từ đây
 * Lợi ích: Dễ maintain, validate và track usage
 */
const env = {
  // ============================================
  // APPLICATION
  // ============================================
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || 'localhost',
  
  // ============================================
  // DATABASE
  // ============================================
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME || 'thsport',
  
  // ============================================
  // JWT AUTHENTICATION
  // ============================================
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  
  // ============================================
  // FRONTEND
  // ============================================
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // ============================================
  // EMAIL (Optional)
  // ============================================
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
  
  // ============================================
  // CLOUDINARY (Optional)
  // ============================================
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  
  // ============================================
  // PAYMENT GATEWAY (Optional)
  // ============================================
  VNPAY_TMN_CODE: process.env.VNPAY_TMN_CODE,
  VNPAY_HASH_SECRET: process.env.VNPAY_HASH_SECRET,
  VNPAY_URL: process.env.VNPAY_URL,
  VNPAY_RETURN_URL: process.env.VNPAY_RETURN_URL
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

const missingEnvVars = requiredEnvVars.filter(envVar => !env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    `Please check your .env file and ensure all required variables are set.`
  );
}

module.exports = { env };
