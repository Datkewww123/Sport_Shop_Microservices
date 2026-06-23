const { getReview, getProduct } = require('../models');
const { Op } = require('sequelize');

exports.createReview = async (req, res) => {
  try {
    const Review = getReview();
    const Product = getProduct();
    const { productId, rating, title, comment, images } = req.body;
    if (!productId || !rating || !comment) return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });

    const existing = await Review.findOne({ where: { user_id: req.user.id, product_id: productId } });
    if (existing) return res.status(400).json({ error: 'Bạn đã đánh giá sản phẩm này rồi' });

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Sản phẩm không tồn tại' });

    const review = await Review.create({
      user_id: req.user.id, product_id: productId,
      rating, title, comment, images: images || [], status: 'pending'
    });
    res.status(201).json({ success: true, message: 'Đánh giá đang chờ duyệt', review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const Review = getReview();
    const { productId } = req.params;
    const { page = 1, limit = 10, rating } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = { product_id: productId, status: 'approved' };
    if (rating) where.rating = Number(rating);

    const { count, rows: reviews } = await Review.findAndCountAll({
      where, order: [['created_at', 'DESC']],
      limit: Number(limit), offset
    });
    res.json({ success: true, reviews, pagination: { currentPage: Number(page), totalPages: Math.ceil(count / limit), total: count } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyReviews = async (req, res) => {
  try {
    const Review = getReview();
    const Product = getProduct();
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const { count, rows: reviews } = await Review.findAndCountAll({
      where: { user_id: req.user.id },
      include: [{ model: Product, attributes: ['name', 'images', 'price'] }],
      order: [['created_at', 'DESC']], limit: Number(limit), offset
    });
    res.json({ success: true, reviews, pagination: { currentPage: Number(page), totalPages: Math.ceil(count / limit), total: count } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const Review = getReview();
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review không tồn tại' });
    await review.update({ status: 'approved' });
    res.json({ success: true, message: 'Đã duyệt review', review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.rejectReview = async (req, res) => {
  try {
    const Review = getReview();
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review không tồn tại' });
    await review.update({ status: 'rejected' });
    res.json({ success: true, message: 'Đã từ chối review', review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.replyReview = async (req, res) => {
  try {
    const Review = getReview();
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review không tồn tại' });
    await review.update({ admin_reply: req.body.reply, admin_replied_at: new Date() });
    res.json({ success: true, message: 'Đã trả lời review', review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const Review = getReview();
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review không tồn tại' });
    if (review.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Không có quyền xóa review này' });
    }
    await review.destroy();
    res.json({ success: true, message: 'Đã xóa review' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};