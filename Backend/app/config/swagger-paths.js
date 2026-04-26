/**
 * Swagger API Paths Documentation
 * Tất cả endpoints được định nghĩa chi tiết với request/response examples
 */

module.exports = {
  // ==================== PRODUCTS ====================
  '/products': {
    get: {
      summary: 'Lấy danh sách sản phẩm với phân trang',
      tags: ['Products'],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 },
          description: 'Số trang'
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 12 },
          description: 'Số sản phẩm mỗi trang'
        },
        {
          in: 'query',
          name: 'category',
          schema: { type: 'string' },
          description: 'Filter theo danh mục'
        },
        {
          in: 'query',
          name: 'brand',
          schema: { type: 'string' },
          description: 'Filter theo thương hiệu'
        },
        {
          in: 'query',
          name: 'sort',
          schema: { type: 'string', default: '-createdAt' },
          description: 'Sắp xếp: -createdAt, price, -price'
        }
      ],
      responses: {
        200: {
          description: 'Danh sách sản phẩm',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  statusCode: { type: 'integer', example: 200 },
                  message: { type: 'string', example: 'Products retrieved successfully' },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        slug: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        discount: { type: 'number' },
                        images: { type: 'array' },
                        category: { type: 'string' },
                        brand: { type: 'string' },
                        stock: { type: 'number' }
                      }
                    }
                  },
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
              }
            }
          }
        }
      }
    },
    post: {
      summary: 'Thêm sản phẩm mới (Admin only)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'price', 'category'],
              properties: {
                name: { type: 'string', example: 'Nike Air Max 90' },
                slug: { type: 'string', example: 'nike-air-max-90' },
                description: { type: 'string' },
                price: { type: 'number', example: 5500000 },
                discount: { type: 'number', example: 10 },
                category: { type: 'string' },
                brand: { type: 'string' },
                images: { type: 'array', items: { type: 'string' } },
                stock: { type: 'number', example: 100 }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Sản phẩm được tạo thành công',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  statusCode: { type: 'integer', example: 201 },
                  message: { type: 'string' },
                  data: { type: 'object' }
                }
              }
            }
          }
        }
      }
    }
  },

  '/products/{id}': {
    get: {
      summary: 'Lấy chi tiết sản phẩm theo ID',
      tags: ['Products'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Product ID'
        }
      ],
      responses: {
        200: {
          description: 'Chi tiết sản phẩm',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  statusCode: { type: 'integer', example: 200 },
                  data: { type: 'object' }
                }
              }
            }
          }
        }
      }
    },
    put: {
      summary: 'Cập nhật sản phẩm (Admin only)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      responses: {
        200: {
          description: 'Cập nhật thành công'
        }
      }
    },
    delete: {
      summary: 'Xóa sản phẩm (Admin only)',
      tags: ['Products'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Xóa thành công'
        }
      }
    }
  },

  '/products/slug/{slug}': {
    get: {
      summary: 'Lấy sản phẩm theo slug',
      tags: ['Products'],
      parameters: [
        {
          in: 'path',
          name: 'slug',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Chi tiết sản phẩm'
        }
      }
    }
  },

  '/products/search': {
    get: {
      summary: 'Tìm kiếm sản phẩm',
      tags: ['Products'],
      parameters: [
        {
          in: 'query',
          name: 'q',
          required: true,
          schema: { type: 'string' },
          description: 'Từ khóa tìm kiếm'
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 }
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 12 }
        }
      ],
      responses: {
        200: {
          description: 'Kết quả tìm kiếm'
        }
      }
    }
  },

  // ==================== CATEGORIES ====================
  '/categories': {
    get: {
      summary: 'Lấy danh sách danh mục',
      tags: ['Categories'],
      responses: {
        200: {
          description: 'Danh sách danh mục',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  statusCode: { type: 'integer' },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        slug: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      summary: 'Tạo danh mục mới (Admin only)',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string' },
                slug: { type: 'string' },
                description: { type: 'string' },
                image: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Tạo thành công' }
      }
    }
  },

  '/categories/{id}': {
    get: {
      summary: 'Lấy danh mục theo ID',
      tags: ['Categories'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Chi tiết danh mục' }
      }
    },
    put: {
      summary: 'Cập nhật danh mục (Admin only)',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    },
    delete: {
      summary: 'Xóa danh mục (Admin only)',
      tags: ['Categories'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Xóa thành công' }
      }
    }
  },

  '/categories/slug/{slug}': {
    get: {
      summary: 'Lấy danh mục theo slug',
      tags: ['Categories'],
      parameters: [
        {
          in: 'path',
          name: 'slug',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Chi tiết danh mục' }
      }
    }
  },

  // ==================== BRANDS ====================
  '/brands': {
    get: {
      summary: 'Lấy danh sách thương hiệu',
      tags: ['Brands'],
      responses: {
        200: {
          description: 'Danh sách thương hiệu',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  statusCode: { type: 'integer' },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        slug: { type: 'string' },
                        logo: { type: 'string' },
                        description: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      summary: 'Tạo thương hiệu mới (Admin only)',
      tags: ['Brands'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string' },
                slug: { type: 'string' },
                logo: { type: 'string' },
                description: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Tạo thành công' }
      }
    }
  },

  '/brands/{id}': {
    get: {
      summary: 'Lấy thương hiệu theo ID',
      tags: ['Brands'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Chi tiết thương hiệu' }
      }
    },
    put: {
      summary: 'Cập nhật thương hiệu (Admin only)',
      tags: ['Brands'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    },
    delete: {
      summary: 'Xóa thương hiệu (Admin only)',
      tags: ['Brands'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Xóa thành công' }
      }
    }
  },

  // ==================== CART ====================
  '/cart': {
    get: {
      summary: 'Lấy giỏ hàng hiện tại',
      tags: ['Cart'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Giỏ hàng'
        }
      }
    },
    post: {
      summary: 'Thêm sản phẩm vào giỏ hàng',
      tags: ['Cart'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['productId', 'quantity'],
              properties: {
                productId: { type: 'string' },
                quantity: { type: 'number', example: 1 }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Thêm thành công' }
      }
    }
  },

  '/cart/{itemId}': {
    put: {
      summary: 'Cập nhật số lượng sản phẩm trong giỏ',
      tags: ['Cart'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'itemId',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                quantity: { type: 'number', example: 2 }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    },
    delete: {
      summary: 'Xóa sản phẩm khỏi giỏ hàng',
      tags: ['Cart'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'itemId',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Xóa thành công' }
      }
    }
  },

  '/cart/clear': {
    delete: {
      summary: 'Xóa toàn bộ giỏ hàng',
      tags: ['Cart'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Xóa thành công' }
      }
    }
  },

  // ==================== ORDERS ====================
  '/orders': {
    get: {
      summary: 'Lấy danh sách đơn hàng của user',
      tags: ['Orders'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 }
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10 }
        },
        {
          in: 'query',
          name: 'status',
          schema: { type: 'string' },
          description: 'pending, processing, shipped, delivered, cancelled'
        }
      ],
      responses: {
        200: { description: 'Danh sách đơn hàng' }
      }
    },
    post: {
      summary: 'Tạo đơn hàng mới',
      tags: ['Orders'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['items', 'shippingAddress'],
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      productId: { type: 'string' },
                      quantity: { type: 'number' }
                    }
                  }
                },
                shippingAddress: { type: 'string' },
                phone: { type: 'string' },
                notes: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Tạo đơn hàng thành công' }
      }
    }
  },

  '/orders/{id}': {
    get: {
      summary: 'Lấy chi tiết đơn hàng',
      tags: ['Orders'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Chi tiết đơn hàng' }
      }
    },
    put: {
      summary: 'Cập nhật đơn hàng (Admin only)',
      tags: ['Orders'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    },
    delete: {
      summary: 'Hủy đơn hàng',
      tags: ['Orders'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Hủy thành công' }
      }
    }
  },

  // ==================== AUTHENTICATION ====================
  '/auth/register': {
    post: {
      summary: 'Đăng ký tài khoản mới',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'username', 'password', 'name'],
              properties: {
                email: { type: 'string', format: 'email' },
                username: { type: 'string' },
                password: { type: 'string', format: 'password' },
                name: { type: 'string' },
                phone: { type: 'string' },
                address: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Đăng ký thành công',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  statusCode: { type: 'integer' },
                  message: { type: 'string' },
                  data: {
                    type: 'object',
                    properties: {
                      token: { type: 'string' },
                      user: { type: 'object' }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Email/username đã tồn tại hoặc dữ liệu không hợp lệ'
        }
      }
    }
  },

  '/auth/login': {
    post: {
      summary: 'Đăng nhập',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', format: 'password' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Đăng nhập thành công',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  statusCode: { type: 'integer' },
                  data: {
                    type: 'object',
                    properties: {
                      token: { type: 'string' },
                      user: { type: 'object' }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Email hoặc mật khẩu không chính xác'
        }
      }
    }
  },

  '/auth/profile': {
    get: {
      summary: 'Lấy thông tin profile người dùng',
      tags: ['Authentication'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Thông tin profile' }
      }
    },
    put: {
      summary: 'Cập nhật profile người dùng',
      tags: ['Authentication'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                phone: { type: 'string' },
                address: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    }
  },

  // ==================== USERS ====================
  '/users': {
    get: {
      summary: 'Lấy danh sách users (Admin only)',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 }
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10 }
        }
      ],
      responses: {
        200: { description: 'Danh sách users' }
      }
    }
  },

  '/users/{id}': {
    get: {
      summary: 'Lấy thông tin user (Admin only)',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Thông tin user' }
      }
    },
    put: {
      summary: 'Cập nhật user (Admin only)',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    },
    delete: {
      summary: 'Xóa user (Admin only)',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Xóa thành công' }
      }
    }
  },

  // ==================== PROMOTIONS ====================
  '/promotions': {
    get: {
      summary: 'Lấy danh sách khuyến mãi',
      tags: ['Promotions'],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 }
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10 }
        }
      ],
      responses: {
        200: { description: 'Danh sách khuyến mãi' }
      }
    },
    post: {
      summary: 'Tạo khuyến mãi mới (Admin only)',
      tags: ['Promotions'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['code', 'discountPercentage'],
              properties: {
                code: { type: 'string' },
                discountPercentage: { type: 'number' },
                minOrderValue: { type: 'number' },
                validFrom: { type: 'string', format: 'date-time' },
                validUntil: { type: 'string', format: 'date-time' },
                maxUsage: { type: 'number' }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Tạo khuyến mãi thành công' }
      }
    }
  },

  '/promotions/{id}': {
    get: {
      summary: 'Lấy chi tiết khuyến mãi',
      tags: ['Promotions'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Chi tiết khuyến mãi' }
      }
    },
    put: {
      summary: 'Cập nhật khuyến mãi (Admin only)',
      tags: ['Promotions'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    },
    delete: {
      summary: 'Xóa khuyến mãi (Admin only)',
      tags: ['Promotions'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Xóa thành công' }
      }
    }
  },

  // ==================== NEWS ====================
  '/news': {
    get: {
      summary: 'Lấy danh sách tin tức',
      tags: ['News'],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 }
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10 }
        }
      ],
      responses: {
        200: { description: 'Danh sách tin tức' }
      }
    },
    post: {
      summary: 'Tạo tin tức mới (Admin only)',
      tags: ['News'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'content'],
              properties: {
                title: { type: 'string' },
                slug: { type: 'string' },
                content: { type: 'string' },
                image: { type: 'string' },
                category: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Tạo tin tức thành công' }
      }
    }
  },

  '/news/{id}': {
    get: {
      summary: 'Lấy chi tiết tin tức',
      tags: ['News'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Chi tiết tin tức' }
      }
    },
    put: {
      summary: 'Cập nhật tin tức (Admin only)',
      tags: ['News'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    },
    delete: {
      summary: 'Xóa tin tức (Admin only)',
      tags: ['News'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Xóa thành công' }
      }
    }
  },

  // ==================== INVENTORY ====================
  '/inventory': {
    get: {
      summary: 'Lấy danh sách inventory (Admin only)',
      tags: ['Inventory'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 }
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 20 }
        }
      ],
      responses: {
        200: { description: 'Danh sách inventory' }
      }
    }
  },

  '/inventory/{productId}': {
    get: {
      summary: 'Lấy inventory của sản phẩm (Admin only)',
      tags: ['Inventory'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'productId',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Inventory chi tiết' }
      }
    },
    put: {
      summary: 'Cập nhật inventory (Admin only)',
      tags: ['Inventory'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'productId',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                quantity: { type: 'number' },
                sku: { type: 'string' },
                warehouse: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Cập nhật thành công' }
      }
    }
  }
};
