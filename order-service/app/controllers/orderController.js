const httpStatus = require("../constants/httpStatus");
const Order = require("../models/Order");
const Promotion = require("../models/Promotion");
const responseHelper = require("../helpers/response.helper");

const axios = require('axios'); // npm install axios
const CATALOG_SERVICE_URL = process.env.CATALOG_SERVICE_URL || 'http://localhost:3002';
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://payment-service:3004';
const IDENTITY_SERVICE_URL = process.env.IDENTITY_SERVICE_URL || 'http://identity-service:3001';

const eventBus = require('../utils/eventBus');

exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod = "cod",
      customerNote,
      couponCode,
      discount = 0,
      shippingFee = 0,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Items không thể rỗng" });
    }

    // Validation địa chỉ giao hàng
    if (!shippingAddress) {
      return res
        .status(400)
        .json({ error: "Vui lòng cung cấp địa chỉ giao hàng" });
    }

    // Kiểm tra các trường bắt buộc
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.street) {
      return res
        .status(400)
        .json({ error: "Thông tin địa chỉ giao hàng không đầy đủ (thiếu tên, SĐT hoặc địa chỉ)" });
    }

    // Tính subtotal từ items
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Auto-apply coupon if provided
    let appliedDiscount = Number(discount) || 0;
    let appliedCouponCode = null;
    if (couponCode) {
      const promotion = await Promotion.findOne({ code: couponCode.toUpperCase(), active: true });
      if (!promotion) {
        return res.status(400).json({ error: 'Mã giảm giá không tồn tại' });
      }
      const now = new Date();
      if (promotion.startDate && now < promotion.startDate) {
        return res.status(400).json({ error: 'Mã giảm giá chưa đến hạn sử dụng' });
      }
      if (promotion.endDate && now > promotion.endDate) {
        return res.status(400).json({ error: 'Mã giảm giá đã hết hạn' });
      }
      if (promotion.maxUses && promotion.currentUses >= promotion.maxUses) {
        return res.status(400).json({ error: 'Mã giảm giá đã hết lượt sử dụng' });
      }

      if (promotion.discountType === 'percentage') {
        appliedDiscount = Math.round(subtotal * promotion.discount / 100);
      } else {
        appliedDiscount = promotion.discount;
      }
      appliedCouponCode = promotion.code;

      promotion.currentUses += 1;
      await promotion.save();
    }

    const total = subtotal + shippingFee - appliedDiscount;

    if (total < 0) {
      return res.status(400).json({ error: "Tổng tiền không hợp lệ" });
    }

    // Kiểm tra stock và cập nhật sold count
      for (const item of items) {
          // Gọi Catalog service để kiểm tra và trừ stock
          const response = await axios.post(
              `${CATALOG_SERVICE_URL}/api/products/${item.productId}/reduce-stock`,
              { quantity: item.quantity },
              { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
          );
          if (!response.data.success) {
              return res.status(400).json({ error: response.data.error });
          }
      }

    // Tạo order với orderCode tự động
    const order = new Order({
      user: req.user.id,
      items,
      subtotal,
      shippingFee,
      discount: appliedDiscount,
      couponCode: appliedCouponCode,
      total,
      paymentMethod,
      shippingAddress,
      customerNote,
      status: "pending",
      pendingAt: new Date(),
    });

    await order.save();

    // Lấy email người dùng từ identity-service (internal)
    try {
      const userRes = await axios.get(
        `${IDENTITY_SERVICE_URL}/api/users/${req.user.id}`,
        { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
      );
      if (userRes.data && userRes.data.email) {
        order.userEmail = userRes.data.email;
      }
    } catch (userErr) {
      console.error('Failed to fetch user email:', userErr.message);
    }

    // Nếu là MoMo, gọi payment-service để tạo payment URL
    let paymentUrl = null;
    if (paymentMethod === "momo") {
      try {
        const payRes = await axios.post(
          `${PAYMENT_SERVICE_URL}/api/payment/create`,
          {
            orderId: order._id.toString(),
            amount: total,
            orderInfo: `Thanh toan don hang ${order.orderCode}`,
            paymentMethod,
          },
          { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
        );

        if (payRes.data.success) {
          paymentUrl = payRes.data.data.payUrl;
          order.paymentUrl = paymentUrl;
        }
      } catch (payErr) {
        console.error(`${paymentMethod.toUpperCase()} payment creation failed:`, payErr.message);
      }
    }

    // Lưu userEmail (và paymentUrl nếu có)
    await order.save();

    // Publish ORDER_CREATED event (async, fire-and-forget)
    setImmediate(() => {
      eventBus.publishOrderCreated(order);
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Đặt hàng thành công",
      data: {
        _id: order._id,
        orderCode: order.orderCode,
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentUrl,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages,
        total,
        limit: Number(limit),
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if order belongs to user (unless admin)
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { status, paymentStatus, adminNote } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "shipping",
      "delivered",
      "cancelled",
    ];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Status không hợp lệ" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Cập nhật status và timestamp tương ứng
    if (status && status !== order.status) {
      order.status = status;

      switch (status) {
        case "confirmed":
          order.confirmedAt = new Date();
          break;
        case "shipping":
          order.shippingAt = new Date();
          break;
        case "delivered":
          order.deliveredAt = new Date();
          order.paymentStatus = "paid"; // Tự động set paid khi giao hàng thành công

          // Cập nhật sold count qua catalog-service
          for (const item of order.items) {
            await axios.post(
              `${CATALOG_SERVICE_URL}/api/products/${item.productId}/increment-sold`,
              { quantity: item.quantity },
              { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
            );
          }

          // Publish ORDER_DELIVERED
          setImmediate(() => eventBus.publishOrderDelivered(order));
          break;
        case "cancelled":
          order.cancelledAt = new Date();

          // Hoàn trả stock qua catalog-service
          for (const item of order.items) {
            await axios.post(
              `${CATALOG_SERVICE_URL}/api/products/${item.productId}/restore-stock`,
              { quantity: item.quantity },
              { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
            );
          }

          // Publish ORDER_CANCELLED
          setImmediate(() => eventBus.publishOrderCancelled(order));
          break;
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
      if (paymentStatus === "paid") {
        order.paidAt = new Date();
      }
    }

    if (adminNote) {
      order.adminNote = adminNote;
    }

    await order.save();

    res.json({
      success: true,
      message: "Cập nhật đơn hàng thành công",
      order,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User hủy đơn hàng (chỉ khi pending hoặc confirmed)
exports.cancelOrder = async (req, res) => {
  try {
    const { cancelReason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Kiểm tra quyền sở hữu
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền hủy đơn hàng này" });
    }

    // Kiểm tra có thể hủy không
    if (!order.canBeCancelled()) {
      return res.status(400).json({
        error:
          "Không thể hủy đơn hàng ở trạng thái hiện tại. Vui lòng liên hệ bộ phận chăm sóc khách hàng.",
      });
    }

    // Hủy đơn và hoàn stock
    await order.cancel(cancelReason);

    // Hoàn trả stock qua catalog-service
    for (const item of order.items) {
      await axios.post(
        `${CATALOG_SERVICE_URL}/api/products/${item.productId}/restore-stock`,
        { quantity: item.quantity },
        { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
      );
    }

    // Publish ORDER_CANCELLED
    setImmediate(() => eventBus.publishOrderCancelled(order));

    res.json({
      success: true,
      message: "Hủy đơn hàng thành công",
      order,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Chỉ admin mới có quyền xóa
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền xóa đơn hàng" });
    }

    // Chỉ xóa được đơn đã cancelled
    if (order.status !== "cancelled") {
      return res.status(400).json({ error: "Chỉ có thể xóa đơn hàng đã hủy" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Đã xóa đơn hàng",
      id: req.params.id,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find({ user: req.user.id, status: "delivered" })
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit))
      .select("-adminNote"); // Không hiển thị ghi chú admin cho user

    const total = await Order.countDocuments({
      user: req.user.id,
      status: "delivered",
    });
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages,
        total,
        limit: Number(limit),
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Internal: Cập nhật trạng thái thanh toán (từ payment-service callback)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentTransactionId, paidAmount, failureReason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.paymentStatus = paymentStatus;
    if (paymentTransactionId) {
      order.paymentTransactionId = paymentTransactionId;
    }
    if (paymentStatus === 'paid') {
      order.paidAt = new Date();
    }

    await order.save();

    // Publish ORDER_PAID if payment succeeded
    if (paymentStatus === 'paid') {
      setImmediate(() => eventBus.publishOrderPaid(order));
    }

    res.json({ success: true, message: 'Payment status updated' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};



// --- ADMIN CONTROLLERS ---

exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter = {};
    if (status) filter.status = status;

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { orderCode: searchRegex },
        { userEmail: searchRegex },
        { 'shippingAddress.fullName': searchRegex },
        { 'shippingAddress.phone': searchRegex }
      ];
    }

    const orders = await Order.find(filter)
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "shipping",
      "delivered",
      "cancelled",
    ];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Status không hợp lệ" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Cập nhật status và timestamp tương ứng
    if (status && status !== order.status) {
      order.status = status;

      switch (status) {
        case "confirmed":
          order.confirmedAt = new Date();
          break;
        case "shipping":
          order.shippingAt = new Date();
          break;
        case "delivered":
          order.deliveredAt = new Date();
          order.paymentStatus = "paid"; // Tự động set paid khi giao hàng thành công
          order.paidAt = new Date();

          // Cập nhật sold count qua catalog-service
          for (const item of order.items) {
            try {
              await axios.post(
                `${CATALOG_SERVICE_URL}/api/products/${item.productId}/increment-sold`,
                { quantity: item.quantity },
                { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
              );
            } catch (err) {
              console.error(`Failed to increment sold count for product ${item.productId}:`, err.message);
            }
          }

          // Publish ORDER_DELIVERED
          setImmediate(() => eventBus.publishOrderDelivered(order));
          break;
        case "cancelled":
          order.cancelledAt = new Date();

          // Hoàn trả stock qua catalog-service
          for (const item of order.items) {
            try {
              await axios.post(
                `${CATALOG_SERVICE_URL}/api/products/${item.productId}/restore-stock`,
                { quantity: item.quantity },
                { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
              );
            } catch (err) {
              console.error(`Failed to restore stock for product ${item.productId}:`, err.message);
            }
          }

          // Publish ORDER_CANCELLED
          setImmediate(() => eventBus.publishOrderCancelled(order));
          break;
      }
    }

    await order.save();

    res.json({
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công",
      order,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrderStatsSummary = async (req, res) => {
  try {
    const { date, month, year, quarter } = req.query;
    
    // Construct date filter
    let dateFilter = {};
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      dateFilter = { createdAt: { $gte: start, $lte: end } };
    } else if (month) {
      const [y, m] = month.split('-').map(Number);
      const start = new Date(y, m - 1, 1);
      const end = new Date(y, m, 0, 23, 59, 59, 999);
      dateFilter = { createdAt: { $gte: start, $lte: end } };
    } else if (quarter) {
      const [y, qStr] = quarter.split('-');
      const q = parseInt(qStr.replace('Q', ''));
      const startMonth = (q - 1) * 3;
      const endMonth = q * 3;
      const start = new Date(parseInt(y), startMonth, 1);
      const end = new Date(parseInt(y), endMonth, 0, 23, 59, 59, 999);
      dateFilter = { createdAt: { $gte: start, $lte: end } };
    } else if (year) {
      const start = new Date(parseInt(year), 0, 1);
      const end = new Date(parseInt(year), 11, 31, 23, 59, 59, 999);
      dateFilter = { createdAt: { $gte: start, $lte: end } };
    } else {
      // Default to current year
      const currentYear = new Date().getFullYear();
      const start = new Date(currentYear, 0, 1);
      const end = new Date(currentYear, 11, 31, 23, 59, 59, 999);
      dateFilter = { createdAt: { $gte: start, $lte: end } };
    }

    // 1. Stats Cards
    const totalOrders = await Order.countDocuments(dateFilter);
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    const revenueResult = await Order.aggregate([
      { $match: { status: 'delivered', ...dateFilter } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const rawRecentOrders = await Order.find()
      .sort('-createdAt')
      .limit(5);

    const recentOrders = rawRecentOrders.map(order => ({
      _id: order._id,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      orderCode: order.orderCode,
      user: {
        name: order.shippingAddress?.fullName || order.userEmail || 'Khách hàng'
      }
    }));

    // 2. Revenue Timeline Data (Line Chart 1)
    let groupFormat = "%Y-%m";
    if (date) groupFormat = "%H:00";
    else if (month) groupFormat = "%d/%m";
    else if (quarter || year) groupFormat = "Tháng %m";

    const revenueTimelineRaw = await Order.aggregate([
      { $match: { status: 'delivered', ...dateFilter } },
      { $group: { 
          _id: { $dateToString: { format: groupFormat, date: "$createdAt", timezone: "+07:00" } }, 
          total: { $sum: "$total" } 
        } 
      },
      { $sort: { _id: 1 } }
    ]);
    
    const revenueTimeline = revenueTimelineRaw.map(item => ({
      label: item._id,
      value: item.total
    }));

    // 3. Best Selling Products Data (Line Chart 2)
    const bestSellersRaw = await Order.aggregate([
      { $match: { status: 'delivered', ...dateFilter } },
      { $unwind: "$items" },
      { $group: { 
          _id: "$items.productId", 
          name: { $first: "$items.name" }, 
          quantity: { $sum: "$items.quantity" } 
        } 
      },
      { $sort: { quantity: -1 } },
      { $limit: 5 }
    ]);
    
    const bestSellers = bestSellersRaw.map(item => ({
      label: item.name,
      value: item.quantity
    }));

    // 4. Brand Sales Data (Bar Chart 4)
    let productToBrandMap = {};
    try {
      const CATALOG_SERVICE_URL = process.env.CATALOG_SERVICE_URL || 'http://catalog-service:3002';
      const catalogRes = await axios.get(`${CATALOG_SERVICE_URL}/api/products?limit=1000`);
      if (catalogRes.data) {
        const prods = catalogRes.data.data?.products || catalogRes.data.products || catalogRes.data.data || [];
        prods.forEach(p => {
          productToBrandMap[p._id || p.id] = p.brand?.name || 'Khác';
        });
      }
    } catch (err) {
      console.error('Failed to fetch product brand mappings from catalog-service:', err.message);
    }

    const brandSalesMap = {};
    const ordersForBrands = await Order.find({ status: 'delivered', ...dateFilter });
    ordersForBrands.forEach(order => {
      order.items.forEach(item => {
        const brandName = productToBrandMap[item.productId] || 'Khác';
        brandSalesMap[brandName] = (brandSalesMap[brandName] || 0) + item.quantity;
      });
    });
    
    const brandSales = Object.keys(brandSalesMap).map(brand => ({
      label: brand,
      value: brandSalesMap[brand]
    })).sort((a, b) => b.value - a.value);

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        totalRevenue,
        recentOrders,
        revenueTimeline,
        bestSellers,
        brandSales
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.receiveOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Bạn không có quyền xác nhận đơn hàng này" });
    }

    if (order.status !== "shipping") {
      return res.status(400).json({ error: "Chỉ có thể xác nhận đã nhận hàng khi đơn hàng đang được giao" });
    }

    order.status = "delivered";
    order.deliveredAt = new Date();
    order.paymentStatus = "paid";

    for (const item of order.items) {
      try {
        await axios.post(
          `${CATALOG_SERVICE_URL}/api/products/${item.productId}/increment-sold`,
          { quantity: item.quantity },
          { headers: { 'x-internal-key': process.env.INTERNAL_API_KEY } }
        );
      } catch (catErr) {
        console.error(`Failed to increment sold count for ${item.productId}:`, catErr.message);
      }
    }

    await order.save();

    setImmediate(() => eventBus.publishOrderDelivered(order));

    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
