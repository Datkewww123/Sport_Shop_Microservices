// Backend/app/controllers/authController.js
// Authentication Controller

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const ApiError = require("../utils/ApiError");
const ResponseHelper = require("../helpers/response.helper");
const { httpStatus } = require("../constants/init");

/**
 * Đăng ký tài khoản mới
 * @route POST /api/auth/register
 * @access Public
 */
exports.register = async (req, res, next) => {
  try {
    const { email, username, password, name, phone, address } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ApiError(
        httpStatus.CONFLICT,
        existingUser.email === email 
          ? "Email đã được sử dụng" 
          : "Username đã được sử dụng"
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      name,
      phone: phone || "",
      address: address || "",
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    // Set HTTP-only cookie (bảo mật hơn localStorage)
    res.cookie('accessToken', token, {
      httpOnly: true,  // Ngăn JavaScript truy cập
      secure: env.NODE_ENV === 'production',  // Chỉ HTTPS ở production
      sameSite: 'strict',  // Chống CSRF
      maxAge: 24 * 60 * 60 * 1000  // 1 ngày
    });

    // Prepare user response
    const userResponse = user.toObject();
    delete userResponse.password;

    return ResponseHelper.created(res, { token, user: userResponse }, 'Đăng ký thành công');
  } catch (err) {
    next(err);
  }
};

/**
 * Đăng nhập
 * @route POST /api/auth/login
 * @access Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng");
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    // Set HTTP-only cookie
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000  // 1 ngày
    });

    // Prepare user response
    const userResponse = user.toObject();
    delete userResponse.password;

    return ResponseHelper.success(res, { token, user: userResponse }, 'Đăng nhập thành công');
  } catch (err) {
    next(err);
  }
};

/**
 * Lấy thông tin profile
 * @route GET /api/auth/profile
 * @access Private
 */
exports.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "Không tìm thấy người dùng");
    }

    return ResponseHelper.success(res, user, 'Lấy thông tin thành công');
  } catch (err) {
    next(err);
  }
};

/**
 * Đăng xuất
 * @route POST /api/auth/logout
 * @access Private
 */
exports.logout = (req, res) => {
  // Xóa cookie
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  return ResponseHelper.success(res, null, 'Đăng xuất thành công');
};
