const express  = require('express');
const router   = express.Router();

router.use('/brands',     require('./brands'));
router.use('/categories', require('./categories'));
router.use('/products',   require('./products'));

module.exports = router;