const express = require('express');
const router  = express.Router();
router.use('/orders', require('./orders'));
router.use('/promotions', require('./promotions'));
router.use('/admin/orders', require('./adminOrders'));
module.exports = router;