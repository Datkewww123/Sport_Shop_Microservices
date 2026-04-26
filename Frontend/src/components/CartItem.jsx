// src/components/CartItem.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const originalProductId = item.id.split("_")[0];
  const productUrl = `/san-pham/${item.productSlug || item.originalProductId}`;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const increment = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrement = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  return (
    // Layout cho 1 hàng sản phẩm
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b pb-4">
      {/* 1. Thông tin sản phẩm (chiếm 2/5 cột) */}
      <div className="md:col-span-2 flex items-center gap-4">
        <Link to={productUrl}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
        </Link>
        <div>
          <Link
            to={productUrl}
            className="font-bold text-sm hover:text-primary"
          >
            {item.name}
          </Link>
          {/* Hiển thị size nếu có */}
          {item.selectedSize && (
            <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
          )}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 text-xs hover:underline mt-1"
          >
            Xóa
          </button>
        </div>
      </div>

      <div className="text-sm">
        <span className="md:hidden font-bold">Đơn giá: </span>
        {item.price ? item.price.toLocaleString("vi-VN") : "0"} ₫
      </div>

      <div className="flex items-center border rounded-md max-w-[100px]">
        <button onClick={decrement} className="px-3 py-1 text-lg font-bold">
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-12 text-center font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button onClick={increment} className="px-3 py-1 text-lg font-bold">
          +
        </button>
      </div>

      <div className="text-right font-bold">
        <span className="md:hidden">Thành tiền: </span>
        {item.price && item.quantity ? (item.price * item.quantity).toLocaleString("vi-VN") : "0"} ₫
      </div>
    </div>
  );
}
