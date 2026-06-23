const { getBrand } = require('../models');
const ResponseHelper = require('../helpers/response.helper');

function generateSlug(name) {
  return name.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

exports.createBrand = async (req, res) => {
  try {
    const Brand = getBrand();
    const data = { ...req.body };
    if (!data.slug && data.name) data.slug = generateSlug(data.name);
    const brand = await Brand.create(data);
    return ResponseHelper.created(res, brand, 'Brand created successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.getBrands = async (req, res) => {
  try {
    const Brand = getBrand();
    const brands = await Brand.findAll();
    return ResponseHelper.success(res, brands, 'Brands retrieved successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.getBrandBySlug = async (req, res) => {
  try {
    const Brand = getBrand();
    const brand = await Brand.findOne({ where: { slug: req.params.slug } });
    if (!brand) return ResponseHelper.notFound(res, 'Brand not found');
    return ResponseHelper.success(res, brand, 'Brand retrieved successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const Brand = getBrand();
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return ResponseHelper.notFound(res, 'Brand not found');
    await brand.update(req.body);
    return ResponseHelper.success(res, brand, 'Brand updated successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const Brand = getBrand();
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return ResponseHelper.notFound(res, 'Brand not found');
    await brand.destroy();
    return ResponseHelper.success(res, null, 'Brand deleted successfully');
  } catch (err) {
    return ResponseHelper.error(res, err.message, 400);
  }
};