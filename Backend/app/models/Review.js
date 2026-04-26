const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Đơn hàng liên quan (để verify đã mua)
  
  // Review content
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, trim: true, maxlength: 200 },
  comment: { type: String, required: true, trim: true, minlength: 5, maxlength: 2000 },
  images: [String], // Ảnh review của khách hàng
  
  // Verification
  isVerifiedPurchase: { type: Boolean, default: false }, // Đã mua hàng
  
  // Moderation
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  
  // Helpful votes
  helpfulCount: { type: Number, default: 0 }, // Số người thấy hữu ích
  
  // Admin response
  adminReply: String,
  adminRepliedAt: Date
}, { timestamps: true });

// Indexes
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true }); // Mỗi user chỉ review 1 lần cho 1 sản phẩm
reviewSchema.index({ status: 1 });
reviewSchema.index({ rating: 1 });

// Static methods để cập nhật rating của product
reviewSchema.statics.updateProductRating = async function(productId) {
  const Product = mongoose.model('Product');
  
  const stats = await this.aggregate([
    { $match: { product: productId, status: 'approved' } },
    { 
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(stats[0].avgRating * 10) / 10, // Làm tròn 1 chữ số thập phân
      reviews: stats[0].totalReviews
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      reviews: 0
    });
  }
};

// Post-save hook để cập nhật rating của product
reviewSchema.post('save', function() {
  this.constructor.updateProductRating(this.product);
});

// Post-remove hook
reviewSchema.post('findOneAndDelete', function(doc) {
  if (doc) {
    doc.constructor.updateProductRating(doc.product);
  }
});

module.exports = mongoose.model('Review', reviewSchema);
