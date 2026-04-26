const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, default: '' },
  
  originalPrice: { type: Number, min: 0 },
  price: { type: Number, required: true, min: 0 },
  
  images: [String],
  featuredImageIndex: { type: Number, default: 0 },
  
  variants: [variantSchema],
  availableSizes: [String],
  availableColors: [String],
  
  stock: { type: Number, default: 0, min: 0 },
  sold: { type: Number, default: 0, min: 0 },
  
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0, min: 0 },
  
  gender: { type: String, enum: ['nam', 'nu', 'unisex'], default: 'unisex' },
  material: { type: String, default: '' },
  sole: { type: String, default: '' },
  weight: { type: Number, min: 0 },
  
  tags: [String],
  
  isActive: { type: Boolean, default: true },
  isXakho: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false }
}, { timestamps: true });

productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ sold: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ rating: -1 });

productSchema.index({ category: 1, price: 1 });
productSchema.index({ brand: 1, price: 1 });
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ isActive: 1, isNewArrival: 1 });
productSchema.index({ gender: 1, category: 1 });

function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

productSchema.virtual('discountPercent').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);