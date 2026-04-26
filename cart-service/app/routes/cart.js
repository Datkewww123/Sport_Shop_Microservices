const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addToCart);
router.put('/:itemId', auth, cartController.updateCartItem);
router.delete('/:itemId', auth, cartController.removeCartItem);
router.delete('/', auth, cartController.clearCart);

module.exports = router;