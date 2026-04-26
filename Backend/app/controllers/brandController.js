const Brand = require('../models/Brand');
const ResponseHelper = require('../helpers/response.helper');

exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    return ResponseHelper.created(res, brand, 'Brand created successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    return ResponseHelper.success(res, brands, 'Brands retrieved successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.getBrandBySlug = async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    if (!brand) {
      return ResponseHelper.notFound(res, 'Brand not found');
    }
    return ResponseHelper.success(res, brand, 'Brand retrieved successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!brand) {
      return ResponseHelper.notFound(res, 'Brand not found');
    }
    return ResponseHelper.success(res, brand, 'Brand updated successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return ResponseHelper.notFound(res, 'Brand not found');
    }
    return ResponseHelper.success(res, null, 'Brand deleted successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};
