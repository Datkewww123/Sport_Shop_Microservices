const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Lấy wishlist của user
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name slug price originalPrice images stock rating reviews isActive',
        populate: {
          path: 'brand category',
          select: 'name slug'
        }
      });

    if (!wishlist) {
      // Tạo wishlist mới nếu chưa có
      wishlist = new Wishlist({ user: req.user.id, items: [] });
      await wishlist.save();
    }

    // Lọc bỏ sản phẩm đã bị xóa hoặc không active
    wishlist.items = wishlist.items.filter(item => item.product && item.product.isActive);

    res.json({
      success: true,
      wishlist
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Thêm sản phẩm vào wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID là bắt buộc' });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    if (!product.isActive) {
      return res.status(400).json({ error: 'Sản phẩm không còn khả dụng' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [] });
    }

    // Kiểm tra đã có trong wishlist chưa
    const exists = wishlist.items.some(
      item => item.product.toString() === productId
    );

    if (exists) {
      return res.status(400).json({ error: 'Sản phẩm đã có trong danh sách yêu thích' });
    }

    await wishlist.addItem(productId);

    res.json({
      success: true,
      message: 'Đã thêm vào danh sách yêu thích',
      wishlist
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa sản phẩm khỏi wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist không tồn tại' });
    }

    await wishlist.removeItem(productId);

    res.json({
      success: true,
      message: 'Đã xóa khỏi danh sách yêu thích',
      wishlist
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa toàn bộ wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist không tồn tại' });
    }

    wishlist.items = [];
    await wishlist.save();

    res.json({
      success: true,
      message: 'Đã xóa toàn bộ danh sách yêu thích'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Kiểm tra sản phẩm có trong wishlist không
exports.checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    const isInWishlist = wishlist ? wishlist.isInWishlist(productId) : false;

    res.json({
      success: true,
      isInWishlist
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = exports;
