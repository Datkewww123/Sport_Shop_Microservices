// Backend/scripts/migrate-database.js
// Script để migrate database sang cấu trúc mới

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../app/models/Product');
const Order = require('../app/models/Order');
const User = require('../app/models/User');

async function migrateDatabase() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database\n');

    // 1. Migrate Products
    console.log('Migrating Products...');
    const products = await Product.find({});
    let productCount = 0;
    
    for (const product of products) {
      const updates = {};
      
      // Set originalPrice = price nếu chưa có
      if (!product.originalPrice) {
        updates.originalPrice = product.price;
      }
      
      // Set default values cho các field mới
      if (product.sold === undefined) updates.sold = 0;
      if (product.isActive === undefined) updates.isActive = true;
      if (product.isFeatured === undefined) updates.isFeatured = false;
      if (product.isNewArrival === undefined) updates.isNewArrival = false;
      if (product.featuredImageIndex === undefined) updates.featuredImageIndex = 0;
      if (!product.gender) updates.gender = 'unisex';
      if (!product.tags) updates.tags = [];
      if (!product.availableColors) updates.availableColors = [];
      
      if (Object.keys(updates).length > 0) {
        await Product.updateOne({ _id: product._id }, { $set: updates });
        productCount++;
      }
    }
    console.log(`Migrated ${productCount} products\n`);

    // 2. Migrate Orders
    console.log('Migrating Orders...');
    const orders = await Order.find({});
    let orderCount = 0;
    
    for (const order of orders) {
      const updates = {};
      
      // Tạo orderCode nếu chưa có
      if (!order.orderCode) {
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.floor(1000 + Math.random() * 9000);
        updates.orderCode = `ORD${timestamp}${random}`;
      }
      
      // Set subtotal = total nếu chưa có
      if (!order.subtotal) {
        updates.subtotal = order.total;
      }
      
      // Set default cho các field mới
      if (!order.shippingFee) updates.shippingFee = 0;
      if (!order.discount) updates.discount = 0;
      if (!order.paymentStatus) updates.paymentStatus = 'unpaid';
      
      // Migrate shippingAddress từ string sang object nếu cần
      if (typeof order.shippingAddress === 'string') {
        const parts = order.shippingAddress.split(',').map(s => s.trim());
        updates.shippingAddress = {
          fullName: parts[0] || 'Khách hàng',
          phone: parts[1] || '',
          street: parts.slice(2).join(', ') || order.shippingAddress,
          province: '',
          district: '',
          ward: ''
        };
      }
      
      // Set timestamps
      if (!order.pendingAt) updates.pendingAt = order.createdAt || new Date();
      
      // Migrate status: 'delivering' -> 'shipping', 'completed' -> 'delivered'
      if (order.status === 'delivering') {
        updates.status = 'shipping';
        if (!order.shippingAt) updates.shippingAt = order.updatedAt || new Date();
      }
      if (order.status === 'completed') {
        updates.status = 'delivered';
        if (!order.deliveredAt) updates.deliveredAt = order.updatedAt || new Date();
        updates.paymentStatus = 'paid';
      }
      
      // Set customerNote từ notes
      if (order.notes && !order.customerNote) {
        updates.customerNote = order.notes;
      }
      
      if (Object.keys(updates).length > 0) {
        await Order.updateOne({ _id: order._id }, { $set: updates });
        orderCount++;
      }
    }
    console.log(`Migrated ${orderCount} orders\n`);

    // 3. Migrate Users
    console.log('Migrating Users...');
    const users = await User.find({});
    let userCount = 0;
    
    for (const user of users) {
      const updates = {};
      
      // Set default values cho các field mới
      if (!user.addresses) updates.addresses = [];
      if (!user.avatar) updates.avatar = '';
      if (!user.gender) updates.gender = 'khac';
      if (!user.isVerified) updates.isVerified = false;
      if (user.totalOrders === undefined) updates.totalOrders = 0;
      if (user.totalSpent === undefined) updates.totalSpent = 0;
      
      if (Object.keys(updates).length > 0) {
        await User.updateOne({ _id: user._id }, { $set: updates });
        userCount++;
      }
    }
    console.log(`Migrated ${userCount} users\n`);

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateDatabase();
