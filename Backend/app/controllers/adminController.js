const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Dashboard statistics
exports.getStats = async (req, res) => {
  try {
    // Total products
    const totalProducts = await Product.countDocuments();

    // Total orders
    const totalOrders = await Order.countDocuments();

    // Pending orders
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    // Total revenue (from completed orders)
    const revenueResult = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Total users
    const totalUsers = await User.countDocuments();

    // Recent orders
    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(5)
      .populate('user', 'name email')
      .select('_id user total status createdAt');

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalUsers,
      recentOrders
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = {};
    if (status) filter.status = status;

    // Tìm kiếm theo mã đơn hàng, email, hoặc số điện thoại
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      
      // Tìm user IDs matching search query
      const matchingUsers = await User.find({
        $or: [
          { email: searchRegex },
          { phone: searchRegex },
          { name: searchRegex }
        ]
      }).select('_id');
      
      const userIds = matchingUsers.map(u => u._id);
      
      // Tìm orders với orderCode hoặc user matching
      filter.$or = [
        { orderCode: searchRegex },
        { user: { $in: userIds } }
      ];
    }

    const orders = await Order.find(filter)
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'name email phone');

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'delivering', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find()
      .select('-password')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
