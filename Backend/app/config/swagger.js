const swaggerPaths = require('./swagger-paths');

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'TH Sport API Documentation',
    version: '1.0.0',
    description: 'API documentation cho backend e-commerce TH Sport',
    contact: {
      name: 'API Support',
      email: 'support@thsport.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server - Port 5000'
    },
    {
      url: 'https://thsport-backend.onrender.com/api',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token in the format: Bearer <token>'
      }
    },
    schemas: {
      SuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          statusCode: { type: 'integer', example: 200 },
          message: { type: 'string', example: 'Success' },
          data: { type: 'object' }
        }
      },
      PaginatedResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          statusCode: { type: 'integer', example: 200 },
          message: { type: 'string', example: 'Success' },
          data: { type: 'array', items: { type: 'object' } },
          pagination: {
            type: 'object',
            properties: {
              currentPage: { type: 'integer' },
              totalPages: { type: 'integer' },
              total: { type: 'integer' },
              limit: { type: 'integer' }
            }
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          statusCode: { type: 'integer' },
          message: { type: 'string' },
          errors: { type: 'object' }
        }
      }
    }
  },
  paths: swaggerPaths,
  tags: [
    { name: 'Authentication', description: 'API xác thực người dùng' },
    { name: 'Products', description: 'API quản lý sản phẩm' },
    { name: 'Categories', description: 'API quản lý danh mục' },
    { name: 'Brands', description: 'API quản lý thương hiệu' },
    { name: 'Cart', description: 'API quản lý giỏ hàng' },
    { name: 'Orders', description: 'API quản lý đơn hàng' },
    { name: 'Users', description: 'API quản lý người dùng' },
    { name: 'Promotions', description: 'API quản lý khuyến mãi' },
    { name: 'News', description: 'API quản lý tin tức' },
    { name: 'Inventory', description: 'API quản lý kho hàng' }
  ],
  security: [
    {
      bearerAuth: []
    }
  ]
};

module.exports = swaggerSpec;
