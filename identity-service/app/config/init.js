// Backend/app/config/init.js
// Configuration initialization and loader

const dbConf = require('./db.conf');
const appConf = require('./app.conf');
const appKeys = require('./app.keys');
const dbKeys = require('./db.keys');

module.exports = {
  database: dbConf,
  app: appConf,
  appKeys,
  dbKeys
};
