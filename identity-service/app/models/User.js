const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  street: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, default: '', trim: true },
  avatar: { type: String, default: '' }, // URL ảnh đại diện
  dateOfBirth: Date, // Ngày sinh
  gender: { type: String, enum: ['nam', 'nu', 'khac'], default: 'khac' },
  
  // Addresses (mảng địa chỉ giao hàng)
  addresses: [addressSchema],
  
  // Legacy field for backward compatibility
  address: { type: String, default: '' },
  
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false }, // Email đã xác thực
  
  // Stats
  totalOrders: { type: Number, default: 0 }, // Tổng số đơn hàng
  totalSpent: { type: Number, default: 0 }, // Tổng tiền đã chi
  
  lastLoginAt: Date
}, { timestamps: true }, { timestamps: true });

// Indexes
userSchema.index({ email: 1, username: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Instance methods
userSchema.methods.getDefaultAddress = function() {
  return this.addresses.find(addr => addr.isDefault) || this.addresses[0];
};

userSchema.methods.addAddress = function(addressData) {
  // Nếu đây là địa chỉ đầu tiên hoặc được đánh dấu default, set isDefault = true
  if (this.addresses.length === 0 || addressData.isDefault) {
    // Bỏ default của các địa chỉ khác
    this.addresses.forEach(addr => addr.isDefault = false);
    addressData.isDefault = true;
  }
  this.addresses.push(addressData);
  return this.save();
};

userSchema.methods.setDefaultAddress = function(addressId) {
  this.addresses.forEach(addr => {
    addr.isDefault = addr._id.toString() === addressId.toString();
  });
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
