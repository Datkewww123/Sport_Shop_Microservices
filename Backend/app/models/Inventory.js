const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: String,
  quantity: { type: Number, default: 0, required: true }
});

inventorySchema.index({ product: 1 });

module.exports = mongoose.model('Inventory', inventorySchema);
