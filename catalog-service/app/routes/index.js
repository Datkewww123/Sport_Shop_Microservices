const express  = require('express');
const router   = express.Router();

router.use('/brands',     require('./brands'));
router.use('/categories', require('./categories'));
router.use('/products',   require('./products'));
router.use('/reviews',    require('./reviews'));
router.use('/wishlist',   require('./wishlist'));
router.use('/news',       require('./news'));

module.exports = router;