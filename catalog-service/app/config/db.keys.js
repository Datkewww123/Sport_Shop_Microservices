// Backend/app/config/db.keys.js
// Database keys and credentials configuration

module.exports = {
  mongodb: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DB || 'webdemo-thsport'
  }
};
