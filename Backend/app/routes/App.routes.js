// Backend/app/routes/App.routes.js
// Main application routes

const express = require('express');
const router = express.Router();

// Import all routes
const authRoutes = require('./auth');
const productRoutes = require('./products');
const categoryRoutes = require('./categories');
const brandRoutes = require('./brands');
const orderRoutes = require('./orders');
const userRoutes = require('./users');
const cartRoutes = require('./cart');
const inventoryRoutes = require('./inventory');
const newsRoutes = require('./news');
const promotionRoutes = require('./promotions');
const adminRoutes = require('./admin');
const reviewRoutes = require('./reviews');
const wishlistRoutes = require('./wishlist');

// Register routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/news', newsRoutes);
router.use('/promotions', promotionRoutes);
router.use('/admin', adminRoutes);
router.use('/reviews', reviewRoutes);
router.use('/wishlist', wishlistRoutes);

module.exports = router;
