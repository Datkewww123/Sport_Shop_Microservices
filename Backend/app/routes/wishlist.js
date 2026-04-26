const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const auth = require('../middleware/auth');

// Tất cả routes đều cần authentication
router.use(auth);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);
router.delete('/', wishlistController.clearWishlist);
router.get('/check/:productId', wishlistController.checkWishlist);

module.exports = router;
