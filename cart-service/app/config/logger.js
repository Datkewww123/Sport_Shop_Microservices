const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const LOG_DIR = path.join(process.cwd(), 'logs');

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += `\n${JSON.stringify(meta, null, 2)}`;
    }
    return msg;
  })
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase().padEnd(5)}] ${message}`;
    
    if (Object.keys(meta).length > 0) {
      const inline = [];
      if (meta.statusCode) inline.push(`Status: ${meta.statusCode}`);
      if (meta.duration) inline.push(`Time: ${meta.duration}`);
      if (meta.ip) inline.push(`IP: ${meta.ip}`);
      if (meta.userId) inline.push(`User: ${meta.userId}`);
      
      if (inline.length > 0) {
        log += ` | ${inline.join(' | ')}`;
      }
      
      const details = { ...meta };
      delete details.statusCode;
      delete details.duration;
      delete details.ip;
      delete details.userId;
      
      if (Object.keys(details).length > 0) {
        const detailStr = JSON.stringify(details, null, 2);
        log += '\n    Details: ' + detailStr.replace(/\n/g, '\n       ');
      }
    }
    
    if (message.includes('RESPONSE')) {
      log += '\n' + '-'.repeat(80);
    }
    
    return log;
  })
);

const transports = [];

if (process.env.NODE_ENV === 'production') {
  transports.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: fileFormat,
      level: 'info'
    })
  );

  transports.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      format: fileFormat,
      level: 'error'
    })
  );

  transports.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'http-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '7d',
      format: fileFormat,
      level: 'http'
    })
  );

  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'info'
    })
  );
}

if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'debug'
    })
  );
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: winston.config.npm.levels,
  transports,
  exitOnError: false
});

logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  }
};

module.exports = { logger };