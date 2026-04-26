// Backend/app/database/init.js
// Database initialization

const mongoDatabase = require('./Mongo.database');

module.exports = {
  mongodb: mongoDatabase,

  async init() {
    await mongoDatabase.connect();
  },

  async close() {
    await mongoDatabase.disconnect();
  }
};
