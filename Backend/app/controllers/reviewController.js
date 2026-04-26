const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Tạo review mới
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment, images, orderId } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
    }

    // Kiểm tra đã review chưa
    const existingReview = await Review.findOne({ 
      user: req.user.id, 
      product: productId 
    });

    if (existingReview) {
      return res.status(400).json({ error: 'Bạn đã đánh giá sản phẩm này rồi' });
    }

    // Kiểm tra product tồn tại
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    // Kiểm tra đã mua hàng chưa (nếu có orderId)
    let isVerifiedPurchase = false;
    if (orderId) {
      const order = await Order.findOne({
        _id: orderId,
        user: req.user.id,
        status: 'delivered',
        'items.productId': productId
      });
      isVerifiedPurchase = !!order;
    }

    const review = new Review({
      user: req.user.id,
      product: productId,
      order: orderId,
      rating,
      title,
      comment,
      images: images || [],
      isVerifiedPurchase,
      status: 'pending' // Chờ admin duyệt
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Đánh giá của bạn đã được gửi và đang chờ duyệt',
      review
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy reviews của 1 sản phẩm
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, rating, sort = '-createdAt' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = { 
      product: productId, 
      status: 'approved' // Chỉ hiển thị review đã duyệt
    };

    if (rating) {
      filter.rating = Number(rating);
    }

    const reviews = await Review.find(filter)
      .populate('user', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Thống kê rating
    const ratingStats = await Review.aggregate([
      { $match: { product: productId, status: 'approved' } },
      { 
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.json({
      success: true,
      reviews,
      pagination: {
        currentPage: Number(page),
        totalPages,
        total,
        limit: Number(limit)
      },
      ratingStats
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User lấy reviews của mình
exports.getMyReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const reviews = await Review.find({ user: req.user.id })
      .populate('product', 'name images price')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments({ user: req.user.id });

    res.json({
      success: true,
      reviews,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        total,
        limit: Number(limit)
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin duyệt review
exports.approveReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review không tồn tại' });
    }

    res.json({
      success: true,
      message: 'Đã duyệt review',
      review
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin từ chối review
exports.rejectReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review không tồn tại' });
    }

    res.json({
      success: true,
      message: 'Đã từ chối review',
      review
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin reply review
exports.replyReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const review = await Review.findByIdAndUpdate(
      id,
      { 
        adminReply: reply,
        adminRepliedAt: new Date()
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review không tồn tại' });
    }

    res.json({
      success: true,
      message: 'Đã trả lời review',
      review
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa review (chỉ user hoặc admin)
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: 'Review không tồn tại' });
    }

    // Kiểm tra quyền
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Không có quyền xóa review này' });
    }

    await Review.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Đã xóa review'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = exports;
