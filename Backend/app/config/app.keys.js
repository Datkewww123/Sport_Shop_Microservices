// Backend/app/config/app.keys.js
// API Keys and secrets configuration

module.exports = {
  jwt: {
    accessTokenSecret: process.env.JWT_SECRET || 'access-token-secret',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'refresh-token-secret'
  },

  // Add other API keys here as needed
  apiKeys: {
    // External services keys
  }
};
