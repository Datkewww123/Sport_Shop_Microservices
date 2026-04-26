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
  
  // Pricing
  originalPrice: { type: Number, min: 0 }, // Giá gốc (trước giảm giá)
  price: { type: Number, required: true, min: 0 }, // Giá hiện tại (sau giảm giá)
  
  // Media
  images: [String],
  featuredImageIndex: { type: Number, default: 0 }, // Index của ảnh chính trong mảng images
  
  // Variants & Options
  variants: [variantSchema],
  availableSizes: [String], // ['38', '39', '40', '41', '42', '43']
  availableColors: [String], // ['Đen', 'Trắng', 'Đỏ'] - màu sắc có sẵn
  
  // Inventory
  stock: { type: Number, default: 0, min: 0 },
  sold: { type: Number, default: 0, min: 0 }, // Số lượng đã bán
  
  // Rating & Reviews
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: Number, default: 0, min: 0 }, // Số lượng đánh giá
  
  // Product Attributes (for sports shoes)
  gender: { type: String, enum: ['nam', 'nu', 'unisex'], default: 'unisex' }, // Giới tính
  material: { type: String, default: '' }, // Chất liệu (vải, da, synthetic)
  sole: { type: String, default: '' }, // Chất liệu đế (cao su, EVA, PU)
  weight: { type: Number, min: 0 }, // Trọng lượng (gram)
  
  // Tags & SEO
  tags: [String], // ['chạy bộ', 'bóng đá', 'training']
  
  // Status
  isActive: { type: Boolean, default: true }, // Hiển thị trên web
  isXakho: { type: Boolean, default: false }, // Hàng xả kho
  isFeatured: { type: Boolean, default: false }, // Sản phẩm nổi bật
  isNewArrival: { type: Boolean, default: false } // Hàng mới về
}, { timestamps: true });

// Indexes để tối ưu hóa truy vấn
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ sold: -1 }); // Sort theo bán chạy
productSchema.index({ createdAt: -1 }); // Sort theo mới nhất
productSchema.index({ rating: -1 }); // Sort theo rating

// Compound indexes cho filter phức tạp
productSchema.index({ category: 1, price: 1 });
productSchema.index({ brand: 1, price: 1 });
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ isActive: 1, isNewArrival: 1 });
productSchema.index({ gender: 1, category: 1 }); // Filter theo giới tính + category
// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Auto-generate slug before save
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// Virtual để tính discount percentage
productSchema.virtual('discountPercent').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Đảm bảo virtuals được bao gồm khi convert sang JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
