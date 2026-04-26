// src/pages/CartPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem"; // Import component con

export default function CartPage() {
  // Lấy dữ liệu từ Context
  const { cartItems, cartCount, totalPrice } = useCart();

  // Xử lý trường hợp giỏ hàng rỗng
  if (cartCount === 0) {
    return (
      <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
        <Link
          to="/"
          className="bg-primary text-white py-3 px-6 rounded-md font-bold hover:bg-primary-dark"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  // Xử lý trường hợp có sản phẩm
  return (
    <div className="container w-[90%] max-w-[1200px] mx-auto mt-10 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Giỏ Hàng Của Bạn</h1>

      {/* Layout 2 cột: 1 cho danh sách, 1 cho tổng tiền */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột 1: Danh sách sản phẩm (chiếm 2/3) */}
        <div className="lg:col-span-2">
          {/* Tiêu đề của bảng (chỉ hiển thị trên desktop) */}
          <div className="hidden md:grid grid-cols-5 gap-4 font-bold border-b pb-2 mb-4">
            <div className="col-span-2">Sản phẩm</div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div className="text-right">Thành tiền</div>
          </div>
          {/* Danh sách lặp ra */}
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Cột 2: Tóm tắt đơn hàng (chiếm 1/3) */}
        <div className="lg:col-span-1 bg-gray-100 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-4">Tóm tắt đơn hàng</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">
              Tạm tính ({cartCount} sản phẩm):
            </span>
            <span className="font-bold">
              {totalPrice.toLocaleString("vi-VN")} ₫
            </span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
            <span>Tổng cộng:</span>
            <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
          </div>

          {/* Link đến trang thanh toán (sẽ tạo sau) */}
          <Link
            to="/thanh-toan" // Bước tiếp theo
            className="block text-center w-full bg-primary text-white text-lg font-bold uppercase py-3 px-6 rounded-md transition-colors hover:bg-primary-dark mt-6"
          >
            Tiến hành thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
}
