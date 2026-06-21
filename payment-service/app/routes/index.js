const express = require('express');
const router = express.Router();

const paymentRoutes = require('./payment');

router.use('/payment', paymentRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'payment-service' });
});

module.exports = router;
