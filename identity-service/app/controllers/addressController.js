const User = require('../models/User');

exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('addresses');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, data: user.addresses });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { fullName, phone, province, district, ward, street, isDefault } = req.body;
    if (!fullName || !phone || !province || !district || !street) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin địa chỉ' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.addAddress({ fullName, phone, province, district, ward, street, isDefault });
    res.status(201).json({ success: true, data: user.addresses });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { fullName, phone, province, district, ward, street, isDefault } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ error: 'Địa chỉ không tồn tại' });
    }
    if (fullName !== undefined) address.fullName = fullName;
    if (phone !== undefined) address.phone = phone;
    if (province !== undefined) address.province = province;
    if (district !== undefined) address.district = district;
    if (ward !== undefined) address.ward = ward;
    if (street !== undefined) address.street = street;
    if (isDefault !== undefined) {
      user.addresses.forEach(addr => addr.isDefault = false);
      address.isDefault = true;
    }
    await user.save();
    res.json({ success: true, data: user.addresses });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ error: 'Địa chỉ không tồn tại' });
    }
    address.deleteOne();
    await user.save();
    res.json({ success: true, data: user.addresses });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.setDefaultAddress(addressId);
    res.json({ success: true, data: user.addresses });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
