// Backend/app/database/Mongo.database.js
// MongoDB connection handler with retry logic

const mongoose = require('mongoose');
const { database } = require('../config/init');
const { logger } = require('../config/logger');

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

class MongoDatabase {
  constructor() {
    this.connection = null;
    this.isConnected = false;
  }

  /**
   * Connect to MongoDB with retry logic
   * @param {number} retryCount - Current retry attempt
   * @returns {Promise<Connection>} Mongoose connection
   */
  async connect(retryCount = 0) {
    try {
      if (this.isConnected) {
        logger.info('MongoDB already connected');
        return this.connection;
      }

      const { uri, options } = database.mongodb;

      logger.info(`Connecting to MongoDB... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      
      this.connection = await mongoose.connect(uri, options);
      this.isConnected = true;

      logger.info('MongoDB connected successfully');
      logger.info(`Database: ${database.dbName}`);
      logger.info(`Host: ${mongoose.connection.host}`);

      // Event listeners
      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('error', (error) => {
        logger.error('MongoDB connection error:', { error: error.message });
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected');
        this.isConnected = true;
      });

      return this.connection;
    } catch (error) {
      retryCount++;
      
      if (retryCount >= MAX_RETRIES) {
        logger.error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts`);
        logger.error('Error:', { message: error.message, stack: error.stack });
        throw error;
      }
      
      logger.warn(`MongoDB connection failed (attempt ${retryCount}/${MAX_RETRIES})`);
      logger.warn(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
      
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      return this.connect(retryCount);
    }
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect() {
    try {
      if (this.isConnected) {
        await mongoose.disconnect();
        this.isConnected = false;
        logger.info('MongoDB disconnected gracefully');
      }
    } catch (error) {
      logger.error('✗ Error disconnecting MongoDB:', { error: error.message });
    }
  }

  /**
   * Get connection status
   * @returns {Object} Connection status
   */
  getStatus() {
    return {
      isConnected: this.isConnected,
      ready: mongoose.connection.readyState === 1,
      readyState: this.getReadyStateText(mongoose.connection.readyState),
      host: mongoose.connection.host || 'N/A',
      name: mongoose.connection.name || 'N/A'
    };
  }

  /**
   * Convert readyState number to text
   * @param {number} state - Mongoose connection readyState
   * @returns {string} State text
   */
  getReadyStateText(state) {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[state] || 'unknown';
  }

  /**
   * Drop database (only in development)
   */
  async dropDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot drop database in production');
    }

    try {
      await mongoose.connection.dropDatabase();
      logger.info('Database dropped');
    } catch (error) {
      logger.error('Error dropping database:', { error: error.message });
    }
  }
}

module.exports = new MongoDatabase();
