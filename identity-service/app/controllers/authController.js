const { getUser } = require('../models/User');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { env } = require('../config/environment');
const ApiError = require('../utils/ApiError');
const ResponseHelper = require('../helpers/response.helper');
const { httpStatus } = require('../constants/init');

exports.register = async (req, res, next) => {
  try {
    const User = getUser();
    const { email, username, password, name, phone, address } = req.body;

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    });
    if (existingUser) {
      throw new ApiError(
        httpStatus.CONFLICT,
        existingUser.email === email
          ? 'Email đã được sử dụng'
          : 'Username đã được sử dụng'
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username, email,
      password: hashedPassword,
      name,
      phone: phone || '',
      address: address || '',
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    const userResponse = user.toJSON();
    delete userResponse.password;

    return ResponseHelper.created(res, { token, user: userResponse }, 'Đăng ký thành công');
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const User = getUser();
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Email hoặc mật khẩu không đúng');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Email hoặc mật khẩu không đúng');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    const userResponse = user.toJSON();
    delete userResponse.password;

    return ResponseHelper.success(res, { token, user: userResponse }, 'Đăng nhập thành công');
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const User = getUser();
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
    }

    return ResponseHelper.success(res, user, 'Lấy thông tin thành công');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  return ResponseHelper.success(res, null, 'Đăng xuất thành công');
};

// Kiểm tra email có tồn tại không (dùng cho bước 1 của quên mật khẩu)
exports.checkEmail = async (req, res, next) => {
  try {
    const User = getUser();
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email là bắt buộc' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản với email này' });
    }
    return ResponseHelper.success(res, { email }, 'Email hợp lệ');
  } catch (err) {
    next(err);
  }
};

// Quên mật khẩu: nhập email + mật khẩu mới (không cần OTP vì là MVP)
exports.resetPassword = async (req, res, next) => {
  try {
    const User = getUser();
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email và mật khẩu mới là bắt buộc' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản với email này' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed });
    return ResponseHelper.success(res, null, 'Đặt lại mật khẩu thành công');
  } catch (err) {
    next(err);
  }
};

// Đổi mật khẩu khi đã đăng nhập: cần xác nhận mật khẩu cũ
exports.changePassword = async (req, res, next) => {
  try {
    const User = getUser();
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Mật khẩu cũ và mật khẩu mới là bắt buộc' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    }
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Mật khẩu cũ không đúng' });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed });
    return ResponseHelper.success(res, null, 'Đổi mật khẩu thành công');
  } catch (err) {
    next(err);
  }
};