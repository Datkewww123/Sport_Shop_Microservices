const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  selectedSize: String,
  selectedColor: String, // Thêm màu sắc đã chọn
  imageUrl: String
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
cartSchema.index({ user: 1 });

// Instance methods
cartSchema.methods.getTotalPrice = function() {
  return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

cartSchema.methods.getTotalItems = function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
};

module.exports = mongoose.model('Cart', cartSchema);
