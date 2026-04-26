// Backend/app/utils/Logger.util.js
// Logger utility

const fs = require('fs');
const path = require('path');

class Logger {
  constructor(name = 'app') {
    this.name = name;
    this.logDir = path.join(__dirname, '../../logs');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  format(level, message, data = null) {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${this.name}] [${level}] ${message}`;

    if (data) {
      logMessage += ` - ${JSON.stringify(data)}`;
    }

    return logMessage;
  }

  writeToFile(logMessage, filename = 'app.log') {
    const filepath = path.join(this.logDir, filename);
    fs.appendFileSync(filepath, logMessage + '\n');
  }

  info(message, data = null) {
    const logMessage = this.format('INFO', message, data);
    console.log(`✓ ${logMessage}`);
    this.writeToFile(logMessage);
  }

  error(message, data = null) {
    const logMessage = this.format('ERROR', message, data);
    console.error(`✗ ${logMessage}`);
    this.writeToFile(logMessage, 'error.log');
  }

  warn(message, data = null) {
    const logMessage = this.format('WARN', message, data);
    console.warn(`⚠ ${logMessage}`);
    this.writeToFile(logMessage, 'warn.log');
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      const logMessage = this.format('DEBUG', message, data);
      console.debug(`🔍 ${logMessage}`);
      this.writeToFile(logMessage, 'debug.log');
    }
  }
}

module.exports = Logger;
