const Promotion = require('../models/Promotion');

exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPromotions = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = active !== undefined ? { active: active === 'true' } : {};
    const promotions = await Promotion.find(filter);
    res.json(promotions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Promotion deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const { code, subtotal = 0 } = req.body;
    if (!code) {
      return res.status(400).json({ valid: false, error: 'Vui lòng nhập mã giảm giá' });
    }

    const promotion = await Promotion.findOne({ code: code.toUpperCase(), active: true });
    if (!promotion) {
      return res.status(404).json({ valid: false, error: 'Mã giảm giá không tồn tại' });
    }

    const now = new Date();
    if (promotion.startDate && now < promotion.startDate) {
      return res.status(400).json({ valid: false, error: 'Mã giảm giá chưa đến hạn sử dụng' });
    }
    if (promotion.endDate && now > promotion.endDate) {
      return res.status(400).json({ valid: false, error: 'Mã giảm giá đã hết hạn' });
    }
    if (promotion.maxUses && promotion.currentUses >= promotion.maxUses) {
      return res.status(400).json({ valid: false, error: 'Mã giảm giá đã hết lượt sử dụng' });
    }

    let discountValue = 0;
    if (promotion.discountType === 'percentage') {
      discountValue = Math.round(subtotal * promotion.discount / 100);
    } else {
      discountValue = promotion.discount;
    }

    res.json({
      valid: true,
      promotion: {
        code: promotion.code,
        description: promotion.description,
        discountType: promotion.discountType,
        discount: promotion.discount,
        discountValue,
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
