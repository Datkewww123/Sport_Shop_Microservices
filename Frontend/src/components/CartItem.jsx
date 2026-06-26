// src/components/CartItem.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, selectedIds, toggleItemSelection } = useCart();
  const isSelected = selectedIds.includes(item.id);

  const productUrl = `/san-pham/${item.productSlug || item.productId}`;

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
    <div className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center p-3 sm:p-5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${isSelected ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}>
      {/* Checkbox */}
      <div className="sm:col-span-1 flex items-center justify-start sm:justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleItemSelection(item.id)}
          className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="sm:col-span-4 flex items-center gap-3 sm:gap-4">
        <Link to={productUrl} className="flex-shrink-0">
          <img
            src={item.imageUrl || "https://placehold.co/150x150?text=No+Image"}
            alt={item.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/150x150?text=No+Image";
            }}
          />
        </Link>
        <div className="min-w-0">
          <Link
            to={productUrl}
            className="font-bold text-xs sm:text-sm hover:text-primary dark:text-slate-200 dark:hover:text-primary block leading-tight truncate"
          >
            {item.name}
          </Link>
          {item.selectedSize && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">Size: {item.selectedSize}</p>
          )}
        </div>
      </div>

      {/* Đơn giá */}
      <div className="sm:col-span-2 sm:text-center text-xs sm:text-sm text-gray-700 dark:text-slate-300">
        <span className="sm:hidden font-bold text-xs">Đơn giá: </span>
        {item.price ? Number(item.price).toLocaleString("vi-VN") : "0"} đ
      </div>

      {/* Số lượng */}
      <div className="sm:col-span-2 flex items-center sm:justify-center">
        <span className="sm:hidden font-bold text-xs mr-2">SL: </span>
        <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md max-w-[90px] sm:max-w-[100px] bg-white dark:bg-gray-700">
          <button onClick={decrement} className="px-2 sm:px-3 py-1 text-base sm:text-lg font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white cursor-pointer">
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-10 sm:w-12 text-center font-bold outline-none bg-transparent text-gray-800 dark:text-slate-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button onClick={increment} className="px-2 sm:px-3 py-1 text-base sm:text-lg font-bold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white cursor-pointer">
            +
          </button>
        </div>
      </div>

      {/* Thành tiền */}
      <div className="sm:col-span-2 sm:text-right font-bold text-sm sm:text-base text-gray-800 dark:text-slate-200">
        <span className="sm:hidden font-bold text-xs">Thành tiền: </span>
        {item.price && item.quantity ? (item.price * item.quantity).toLocaleString("vi-VN") : "0"} đ
      </div>

      {/* Nút xóa */}
      <div className="sm:col-span-1 text-right">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 sm:p-2 rounded-xl transition-all duration-200 cursor-pointer"
          title="Xóa sản phẩm"
          aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
        >
          <i className="far fa-trash-alt text-base sm:text-lg" />
        </button>
      </div>
    </div>
  );
}
