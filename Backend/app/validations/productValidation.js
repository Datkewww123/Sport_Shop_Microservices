// Backend/app/validations/productValidation.js
// Product Validation với Joi

const Joi = require('joi');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../constants/init');

/**
 * Validation cho tạo sản phẩm mới
 */
const createProduct = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(200)
      .messages({
        'any.required': 'Tên sản phẩm là bắt buộc',
        'string.empty': 'Tên sản phẩm không được để trống',
        'string.min': 'Tên sản phẩm phải có ít nhất 3 ký tự',
        'string.max': 'Tên sản phẩm không được quá 200 ký tự'
      }),
    
    description: Joi.string()
      .optional()
      .trim()
      .max(2000)
      .messages({
        'string.max': 'Mô tả không được quá 2000 ký tự'
      }),
    
    price: Joi.number()
      .required()
      .min(0)
      .messages({
        'any.required': 'Giá sản phẩm là bắt buộc',
        'number.base': 'Giá sản phẩm phải là số',
        'number.min': 'Giá sản phẩm không được âm'
      }),
    
    salePrice: Joi.number()
      .optional()
      .min(0)
      .less(Joi.ref('price'))
      .messages({
        'number.base': 'Giá khuyến mãi phải là số',
        'number.min': 'Giá khuyến mãi không được âm',
        'number.less': 'Giá khuyến mãi phải nhỏ hơn giá gốc'
      }),
    
    category: Joi.string()
      .required()
      .messages({
        'any.required': 'Danh mục là bắt buộc',
        'string.empty': 'Danh mục không được để trống'
      }),
    
    brand: Joi.string()
      .optional(),
    
    stock: Joi.number()
      .optional()
      .integer()
      .min(0)
      .default(0)
      .messages({
        'number.base': 'Số lượng tồn kho phải là số',
        'number.integer': 'Số lượng tồn kho phải là số nguyên',
        'number.min': 'Số lượng tồn kho không được âm'
      }),
    
    images: Joi.array()
      .optional()
      .items(Joi.string().uri())
      .messages({
        'array.base': 'Images phải là mảng',
        'string.uri': 'URL hình ảnh không hợp lệ'
      }),
    
    specifications: Joi.object()
      .optional(),
    
    tags: Joi.array()
      .optional()
      .items(Joi.string())
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
    next();
  } catch (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation failed', errors));
  }
};

/**
 * Validation cho cập nhật sản phẩm
 */
const updateProduct = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .optional()
      .trim()
      .min(3)
      .max(200)
      .messages({
        'string.min': 'Tên sản phẩm phải có ít nhất 3 ký tự',
        'string.max': 'Tên sản phẩm không được quá 200 ký tự'
      }),
    
    description: Joi.string()
      .optional()
      .trim()
      .max(2000),
    
    price: Joi.number()
      .optional()
      .min(0),
    
    salePrice: Joi.number()
      .optional()
      .min(0),
    
    category: Joi.string()
      .optional(),
    
    brand: Joi.string()
      .optional(),
    
    stock: Joi.number()
      .optional()
      .integer()
      .min(0),
    
    images: Joi.array()
      .optional()
      .items(Joi.string().uri()),
    
    specifications: Joi.object()
      .optional(),
    
    tags: Joi.array()
      .optional()
      .items(Joi.string()),
    
    isActive: Joi.boolean()
      .optional(),
    
    isFeatured: Joi.boolean()
      .optional()
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
    next();
  } catch (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation failed', errors));
  }
};

module.exports = {
  createProduct,
  updateProduct
};
