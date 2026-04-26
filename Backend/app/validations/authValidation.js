// Backend/app/validations/authValidation.js
// Authentication Validation với Joi

const Joi = require('joi');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../constants/init');

// Email regex pattern
const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_RULE_MESSAGE = 'Email không hợp lệ';

// Password regex: ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số
const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const PASSWORD_RULE_MESSAGE = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số';

/**
 * Validation cho đăng ký tài khoản mới
 * Required: email, username, password, name
 * Optional: phone, address
 */
const register = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(EMAIL_RULE)
      .message(EMAIL_RULE_MESSAGE)
      .messages({
        'any.required': 'Email là bắt buộc',
        'string.empty': 'Email không được để trống'
      }),
    
    username: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(30)
      .messages({
        'any.required': 'Username là bắt buộc',
        'string.empty': 'Username không được để trống',
        'string.min': 'Username phải có ít nhất 3 ký tự',
        'string.max': 'Username không được quá 30 ký tự'
      }),
    
    password: Joi.string()
      .required()
      .pattern(PASSWORD_RULE)
      .message(PASSWORD_RULE_MESSAGE)
      .messages({
        'any.required': 'Mật khẩu là bắt buộc',
        'string.empty': 'Mật khẩu không được để trống'
      }),
    
    name: Joi.string()
      .required()
      .trim()
      .min(2)
      .messages({
        'any.required': 'Tên là bắt buộc',
        'string.empty': 'Tên không được để trống',
        'string.min': 'Tên phải có ít nhất 2 ký tự'
      }),
    
    phone: Joi.string()
      .optional()
      .pattern(/^[0-9]{10,11}$/)
      .messages({
        'string.pattern.base': 'Số điện thoại phải có 10-11 chữ số'
      }),
    
    address: Joi.string()
      .optional()
      .trim()
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation failed', errors));
  }
};

/**
 * Validation cho đăng nhập
 * Required: email, password
 */
const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(EMAIL_RULE)
      .message(EMAIL_RULE_MESSAGE)
      .messages({
        'any.required': 'Email là bắt buộc',
        'string.empty': 'Email không được để trống'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Mật khẩu là bắt buộc',
        'string.empty': 'Mật khẩu không được để trống'
      })
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation failed', errors));
  }
};

/**
 * Validation cho cập nhật profile
 * All fields optional
 */
const updateProfile = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .optional()
      .trim()
      .min(2)
      .messages({
        'string.min': 'Tên phải có ít nhất 2 ký tự'
      }),
    
    phone: Joi.string()
      .optional()
      .pattern(/^[0-9]{10,11}$/)
      .messages({
        'string.pattern.base': 'Số điện thoại phải có 10-11 chữ số'
      }),
    
    address: Joi.string()
      .optional()
      .trim()
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
    next();
  } catch (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation failed', errors));
  }
};

/**
 * Validation cho đổi mật khẩu
 * Required: currentPassword, newPassword
 */
const changePassword = async (req, res, next) => {
  const schema = Joi.object({
    currentPassword: Joi.string()
      .required()
      .messages({
        'any.required': 'Mật khẩu hiện tại là bắt buộc',
        'string.empty': 'Mật khẩu hiện tại không được để trống'
      }),
    
    newPassword: Joi.string()
      .required()
      .pattern(PASSWORD_RULE)
      .message(PASSWORD_RULE_MESSAGE)
      .messages({
        'any.required': 'Mật khẩu mới là bắt buộc',
        'string.empty': 'Mật khẩu mới không được để trống'
      })
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation failed', errors));
  }
};

module.exports = {
  register,
  login,
  updateProfile,
  changePassword
};
