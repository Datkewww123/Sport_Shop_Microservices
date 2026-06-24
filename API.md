# API Documentation

Base URL: `http://localhost:8080/api`

## Authentication (identity-service)

### Đăng ký
```http
POST /auth/register
Body: { email, username, password, name, phone?, address? }
Response: 201 { success, data: { token, user } }
```

### Đăng nhập
```http
POST /auth/login
Body: { email, password }
Response: 200 { success, data: { token, user } }
```

### Lấy thông tin profile
```http
GET /auth/profile
Headers: Authorization: Bearer <token>
Response: 200 { success, data: { user } }
```

### Đăng xuất
```http
POST /auth/logout
Response: 200 { success, message }
```

### Kiểm tra email (quên mật khẩu bước 1)
```http
POST /auth/check-email
Body: { email }
Response: 200 { success, message } | 404 { success, message }
```

### Đặt lại mật khẩu (quên mật khẩu bước 2)
```http
POST /auth/reset-password
Body: { email, newPassword }
Response: 200 { success, message }
```

### Đổi mật khẩu (đã đăng nhập)
```http
POST /auth/change-password
Headers: Authorization: Bearer <token>
Body: { oldPassword, newPassword }
Response: 200 { success, message }
```

## Users (identity-service)

### Cập nhật thông tin
```http
PUT /users/:id
Headers: Authorization: Bearer <token>
Body: { name?, phone?, address? }
```

### Xóa user
```http
DELETE /users/:id
Headers: Authorization: Bearer <token>
```

### Lấy danh sách user (admin)
```http
GET /users
Headers: Authorization: Bearer <token>
```

## Addresses (identity-service)

### Lấy danh sách địa chỉ
```http
GET /users/addresses
Headers: Authorization: Bearer <token>
Response: { success, data: [address] }
```

### Thêm địa chỉ mới
```http
POST /users/addresses
Headers: Authorization: Bearer <token>
Body: { fullName, phone, province, district, ward?, street, isDefault? }
Response: 201 { success, data: [addresses] }
```

### Cập nhật địa chỉ
```http
PUT /users/addresses/:addressId
Headers: Authorization: Bearer <token>
Body: { fullName?, phone?, province?, district?, ward?, street?, isDefault? }
```

### Xóa địa chỉ
```http
DELETE /users/addresses/:addressId
Headers: Authorization: Bearer <token>
```

### Đặt làm mặc định
```http
PUT /users/addresses/:addressId/default
Headers: Authorization: Bearer <token>
```

## Products (catalog-service)

### Danh sách sản phẩm
```http
GET /products?page=1&limit=12&category=:id&brand=Nike&minPrice=100000&maxPrice=500000&sort=-createdAt&footType=thon
```

### Tìm kiếm sản phẩm
```http
GET /products/search?q=keyword
```

### Chi tiết sản phẩm
```http
GET /products/:id
GET /products/slug/:slug
```

## Categories (catalog-service)

```http
GET /categories             — Danh sách danh mục
GET /categories/slug/:slug  — Chi tiết danh mục theo slug
POST /categories            — Thêm (admin)
PUT /categories/:id         — Sửa (admin)
DELETE /categories/:id      — Xóa (admin)
```

## Brands (catalog-service)

```http
GET /brands             — Danh sách thương hiệu
POST /brands            — Thêm (admin)
PUT /brands/:id         — Sửa (admin)
DELETE /brands/:id      — Xóa (admin)
```

## Orders (order-service)

```http
POST /orders                — Tạo đơn hàng
GET /orders                 — Danh sách đơn (admin)
GET /orders/user            — Đơn của user hiện tại
GET /orders/:orderCode      — Chi tiết đơn
PUT /orders/:id/status      — Cập nhật trạng thái (admin)
```

## Payments (payment-service)

```http
POST /payments/momo    — Tạo thanh toán MoMo
POST /payments/cod     — Xác nhận COD
```

## Promotions

```http
GET /promotions/check?code=CODE  — Kiểm tra mã giảm giá
```

## Admin (identity-service)

```http
GET /admin/stats           — Thống kê dashboard
GET /admin/users           — Danh sách user
```

## Notifications (notification-service)

```http
POST /notifications/send   — Gửi thông báo
```
