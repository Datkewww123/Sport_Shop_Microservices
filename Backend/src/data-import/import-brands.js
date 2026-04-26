// Script để import brands vào database
require('dotenv').config();
const mongoose = require('mongoose');
const Brand = require('../src/models/Brand');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/webdemo-thsport';

const brands = [
  { name: 'Nike', slug: 'nike', description: 'Thương hiệu thể thao hàng đầu thế giới' },
  { name: 'Adidas', slug: 'adidas', description: 'Thương hiệu thể thao nổi tiếng của Đức' },
  { name: 'Puma', slug: 'puma', description: 'Thương hiệu thể thao cao cấp' },
  { name: 'Mizuno', slug: 'mizuno', description: 'Thương hiệu thể thao Nhật Bản' },
  { name: 'Joma', slug: 'joma', description: 'Thương hiệu thể thao Tây Ban Nha' },
  { name: 'Asics', slug: 'asics', description: 'Thương hiệu giày chạy bộ nổi tiếng' },
  { name: 'NMS', slug: 'nms', description: 'Thương hiệu giày đá bóng Việt Nam' },
  { name: 'KAMITO', slug: 'kamito', description: 'Thương hiệu giày thể thao Việt Nam' },
  { name: 'ZOCKER', slug: 'zocker', description: 'Thương hiệu giày đá bóng chất lượng cao' },
];

async function importBrands() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Xóa tất cả brands cũ
    await Brand.deleteMany({});
    console.log('✓ Cleared existing brands');

    // Thêm brands mới
    const result = await Brand.insertMany(brands);
    console.log(`✓ Imported ${result.length} brands successfully`);

    // Hiển thị danh sách
    console.log('\nBrands imported:');
    result.forEach(brand => {
      console.log(`  - ${brand.name} (${brand.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Error importing brands:', error);
    process.exit(1);
  }
}

importBrands();
