const Category = require('../models/Category');
const ResponseHelper = require('../helpers/response.helper');

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return ResponseHelper.created(res, category, 'Category created successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return ResponseHelper.success(res, categories, 'Categories retrieved successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return ResponseHelper.notFound(res, 'Category not found');
    }
    return ResponseHelper.success(res, category, 'Category retrieved successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return ResponseHelper.notFound(res, 'Category not found');
    }
    return ResponseHelper.success(res, category, 'Category updated successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return ResponseHelper.notFound(res, 'Category not found');
    }
    return ResponseHelper.success(res, { id: category._id }, 'Category deleted successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};
