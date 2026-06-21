require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./app/routes/index');
const logger = require('./app/config/logger');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`Payment service running on port ${PORT}`);
});
