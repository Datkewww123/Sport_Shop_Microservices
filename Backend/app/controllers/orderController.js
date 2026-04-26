const httpStatus = require("../constants/httpStatus");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const responseHelper = require("../helpers/response.helper");

exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod = "cod",
      customerNote,
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
    const total = subtotal + shippingFee - discount;

    if (total < 0) {
      return res.status(400).json({ error: "Tổng tiền không hợp lệ" });
    }

    // Kiểm tra stock và cập nhật sold count
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ error: `Sản phẩm ${item.name} không tồn tại` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Sản phẩm ${item.name} không đủ số lượng (còn ${product.stock})`,
        });
      }

      // Trừ stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Tạo order với orderCode tự động
    const order = new Order({
      user: req.user.id,
      items,
      subtotal,
      shippingFee,
      discount,
      total,
      paymentMethod,
      shippingAddress,
      customerNote,
      status: "pending",
      paymentStatus: "unpaid",
      pendingAt: new Date(),
    });

    await order.save();

    // Xóa giỏ hàng sau khi đặt hàng thành công
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

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

          // Cập nhật sold count cho từng product
          for (const item of order.items) {
            await Product.findByIdAndUpdate(item.productId, {
              $inc: { sold: item.quantity },
            });
          }
          break;
        case "cancelled":
          order.cancelledAt = new Date();

          // Hoàn trả stock khi hủy đơn
          for (const item of order.items) {
            await Product.findByIdAndUpdate(item.productId, {
              $inc: { stock: item.quantity },
            });
          }
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

    // Hoàn trả stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity },
      });
    }

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

// Public lookup - tra cứu đơn hàng bằng orderCode và phone
exports.lookupOrder = async (req, res) => {
  try {
    // Hỗ trợ cả query params và route params
    const orderId = req.query.orderId || req.params.orderId || '';
    const phone = req.query.phone || '';

    console.log("=== LOOKUP REQUEST ===");
    console.log("orderId:", orderId);
    console.log("phone:", phone);

    if (!orderId && !phone) {
      return responseHelper.error(res, httpStatus.BAD_REQUEST, {
        error: "Vui lòng cung cấp mã đơn hàng hoặc số điện thoại"
      });
    }

    let order;

    // Tìm theo orderCode (ưu tiên)
    if (orderId) {
      const lookupKey = orderId.replace(/^#/, '').trim();
      console.log("Looking up with key:", lookupKey);
      
      // Tìm theo orderCode trước
      order = await Order.findOne({ 
        orderCode: { $regex: lookupKey, $options: 'i' }
      });
      console.log("Found by orderCode:", order ? order.orderCode : "NOT FOUND");

      // Nếu không tìm thấy, thử tìm theo _id
      if (!order) {
        const isObjectId = /^[0-9A-F]{24}$/i.test(lookupKey);
        if (isObjectId) {
          order = await Order.findById(lookupKey);
          console.log("Found by _id:", order ? "YES" : "NO");
        } else if (lookupKey.length === 6) {
          // Tìm theo 6 ký tự cuối của _id
          const orders = await Order.aggregate([
            {
              $match: {
                $expr: {
                  $eq: [
                    {
                      $substrCP: [
                        { $toUpper: { $toString: "$_id" } },
                        { $subtract: [{ $strLenCP: { $toString: "$_id" } }, 6] },
                        6,
                      ],
                    },
                    lookupKey.toUpperCase(),
                  ],
                },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
          ]);
          order = orders[0];
          console.log("Found by 6-char _id:", order ? "YES" : "NO");
        }
      }
    }

    // Nếu có phone, filter thêm hoặc tìm theo phone
    if (phone) {
      const phoneRegex = new RegExp(phone.replace(/\s+/g, ''), 'i');
      
      if (order) {
        // Đã có order từ orderId, kiểm tra phone có khớp không
        const orderPhone = order.shippingAddress?.phone || '';
        if (!phoneRegex.test(orderPhone.replace(/\s+/g, ''))) {
          order = null; // Phone không khớp
        }
      } else {
        // Chưa có order, tìm theo phone
        order = await Order.findOne({
          'shippingAddress.phone': phoneRegex
        }).sort('-createdAt');
      }
    }

    if (!order) {
      return responseHelper.error(res, httpStatus.NOT_FOUND, {
        error: "Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn hàng hoặc số điện thoại.",
      });
    }

    // Map dữ liệu
    const orderToMap = order.toObject ? order.toObject() : order;

    const lookupData = {
      _id: orderToMap._id,
      orderCode: orderToMap.orderCode,
      createdAt: orderToMap.createdAt,
      status: orderToMap.status,
      total: orderToMap.total,
      paymentMethod: orderToMap.paymentMethod,
      shippingAddress: orderToMap.shippingAddress,
      customer: orderToMap.shippingAddress?.fullName || 'Khách hàng',
      items: orderToMap.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        selectedSize: item.selectedSize,
      })),
    };

    console.log("Returning lookup data:", lookupData);
    return responseHelper.success(res, lookupData, 'Tra cứu thành công', httpStatus.OK);
  } catch (err) {
    console.error("Lỗi tra cứu:", err);
    return responseHelper.error(res, httpStatus.BAD_REQUEST, {
      error: err.message || "Lỗi không xác định khi tra cứu đơn hàng.",
    });
  }
};
