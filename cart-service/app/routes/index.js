const express = require('express');
const router = express.Router();

const cartRoutes = require('./cart');

router.use('/cart', cartRoutes);

module.exports = router;