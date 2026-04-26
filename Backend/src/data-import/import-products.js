require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Import models
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');

// Hàm tạo slug từ tên
function createSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '') // Chỉ giữ chữ, số, space, dấu gạch ngang
    .trim()
    .replace(/\s+/g, '-') // Thay space bằng dấu gạch ngang
    .replace(/-+/g, '-'); // Xóa dấu gạch ngang thừa
}

// Use cloud MongoDB URI
const MONGO_URI = 'mongodb+srv://phamhungtp2005_db_user:EETQAWrXfq7XiO27@cluster0.06tutrj.mongodb.net/webdemo-thsport?retryWrites=true&w=majority';

// Kết nối MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    importProducts();
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

// Hàm xác định category dựa trên title sản phẩm
async function determineCategoryFromTitle(title) {
  const titleLower = title.toLowerCase();
  
  // Từ khóa để phân loại các sản phẩm
  const categoryKeywords = {
    'Giày đá bóng cỏ tự nhiên': ['fg', 'natural', 'cỏ tự nhiên', 'leather'],
    'Giày đá bóng sân nhân tạo': ['tf', 'artificial', 'nhân tạo', 'synthetic'],
    'Quả bóng đá': ['ball', 'quả bóng', 'football', 'soccer ball'],
    'Vệ sinh/Phụ kiện': ['sock', 'vệ sinh', 'accessories', 'phụ kiện', 'mũ', 'tất']
  };
  
  // Tìm category phù hợp dựa trên keyword
  for (const [categoryName, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (titleLower.includes(keyword)) {
        const category = await Category.findOne({ name: categoryName });
        if (category) return category;
      }
    }
  }
  
  // Nếu không tìm thấy, return category mặc định
  return await Category.findOne({ name: 'Chưa phân loại' });
}

async function importProducts() {
  const products = [];
  const csvFilePath = path.join(__dirname, 'neymar_50_products_with_images.csv');

  // Kiểm tra file có tồn tại không
  if (!fs.existsSync(csvFilePath)) {
    console.error('✗ File CSV không tồn tại:', csvFilePath);
    console.log('Vui lòng copy file "neymar_50_products_with_images.csv" vào folder data-import/');
    process.exit(1);
  }

  // Tạo các category cần thiết
  console.log('Đang khởi tạo categories...');
  const categories = [
    { name: 'Giày đá bóng cỏ tự nhiên', slug: 'giay-da-bong-co-tu-nhien', description: 'Giày đá bóng cho cỏ tự nhiên' },
    { name: 'Giày đá bóng sân nhân tạo', slug: 'giay-da-bong-san-nhan-tao', description: 'Giày đá bóng cho sân nhân tạo' },
    { name: 'Quả bóng đá', slug: 'qua-bong-da', description: 'Quả bóng đá' },
    { name: 'Vệ sinh/Phụ kiện', slug: 've-sinh-phu-kien', description: 'Vệ sinh và phụ kiện thể thao' },
    { name: 'Chưa phân loại', slug: 'chua-phan-loai', description: 'Sản phẩm chưa được phân loại' }
  ];
  
  for (const cat of categories) {
    const existing = await Category.findOne({ name: cat.name });
    if (!existing) {
      await Category.create(cat);
      console.log(`✓ Đã tạo category: ${cat.name}`);
    }
  }

  console.log('Đang đọc file CSV...');

  // Đọc file CSV với encoding UTF-8
  fs.createReadStream(csvFilePath, { encoding: 'utf8' })
    .pipe(csv())
    .on('data', (row) => {
      // Chuyển đổi dữ liệu từ CSV sang format Product model
      const productName = row.title || row.Title || row.name || row.Name || 'Sản phẩm';
      
      // Parse giá: loại bỏ ký tự đặc biệt (₫, .), thay , bằng . để convert
      let priceValue = 0;
      if (row.price) {
        const priceStr = row.price.replace(/[₫\.\s]/g, '').replace(',', '.');
        priceValue = parseFloat(priceStr) || 0;
      }

      // Parse hình ảnh: lấy tối đa 3 hình (1 chính + 2 phụ)
      let images = [];
      if (row.images) {
        try {
          // Xóa dấu ngoặc đơn và split bằng dấu phẩy
          const imageStr = row.images.replace(/[\[\]']/g, '');
          const imageArray = imageStr.split(',').map(img => img.trim()).filter(img => img && img.startsWith('http'));
          images = imageArray.slice(0, 3); // Lấy tối đa 3 hình (1 chính + 2 phụ)
        } catch (e) {
          console.warn(`Không thể parse hình ảnh cho sản phẩm: ${productName}`);
        }
      }

      const product = {
        name: productName,
        slug: createSlug(productName) + '-' + Date.now() + Math.floor(Math.random() * 1000), // Thêm timestamp để tránh trùng
        price: priceValue,
        description: row.description || row.Description || '',
        images: images, // Chỉ lưu tối đa 3 hình (1 chính + 2 phụ)
        categoryPending: productName, // Sẽ được resolve trong on('end')
        brand: null, // Sẽ set dựa trên row.brand
        brandName: row.brand || row.Brand || '', // Tên brand từ CSV
        stock: parseInt(row.stock || row.Stock || 100),
        availableSizes: row.sizes ? row.sizes.split(',').map(s => s.trim()) : ['39', '40', '41', '42', '43'],
        isXakho: false,
      };

      products.push(product);
    })
    .on('end', async () => {
      console.log(`✓ Đọc xong ${products.length} sản phẩm từ CSV`);
      
      try {
        // Xử lý mỗi sản phẩm: gán category và brand
        console.log('Đang xử lý dữ liệu sản phẩm...');
        
        const processedProducts = [];
        for (const product of products) {
          // Xác định category dựa trên title
          const category = await determineCategoryFromTitle(product.categoryPending);
          product.category = category._id;
          
          // Tìm brand dựa trên tên
          if (product.brandName) {
            const brand = await require('../src/models/Brand').findOne({ 
              name: new RegExp(product.brandName, 'i') 
            });
            if (brand) {
              product.brand = brand._id;
              console.log(`✓ ${product.name}: Brand = ${product.brandName}, Category = ${category.name}`);
            } else {
              console.warn(`⚠ Brand không tìm thấy: ${product.brandName} - Sản phẩm: ${product.name}`);
            }
          }
          
          // Xóa các field tạm thời
          delete product.categoryPending;
          delete product.brandName;
          
          processedProducts.push(product);
        }

        // Xóa sản phẩm cũ (mở comment dòng này nếu muốn xóa hết và import mới)
        console.log('Đang xóa tất cả sản phẩm cũ...');
        await Product.deleteMany({});
        console.log('✓ Đã xóa sản phẩm cũ');

        // Insert sản phẩm mới
        const result = await Product.insertMany(processedProducts);
        console.log(`✓ Đã thêm ${result.length} sản phẩm vào database`);
        
        // Hiển thị một vài sản phẩm mẫu
        console.log('\nMột số sản phẩm đã thêm:');
        result.slice(0, 5).forEach(p => {
          console.log(`  - ${p.name}: ${p.price.toLocaleString('vi-VN')} đ (${p.images.length} ảnh)`);
        });

        process.exit(0);
      } catch (error) {
        console.error('✗ Lỗi khi import:', error.message);
        process.exit(1);
      }
    })
    .on('error', (error) => {
      console.error('✗ Lỗi khi đọc CSV:', error);
      process.exit(1);
    });
}
