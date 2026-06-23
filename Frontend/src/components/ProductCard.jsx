// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Tạo một link sử dụng slug thay vì ID
  const productUrl = `/san-pham/${product.slug || product.id}`;

  // Tính phần trăm giảm giá nếu có
  const discountPercentage = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    // Card phóng to mạnh hơn khi hover, sử dụng flex flex-col h-full để đồng bộ chiều cao
    <div className="product-card flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300 group border border-gray-100 hover:-translate-y-2 relative">
      <Link to={productUrl} className="block relative overflow-hidden bg-gray-50 rounded-t-xl">
        {/* Discount Badge */}
        {discountPercentage !== null && discountPercentage > 0 ? (
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold z-10 shadow-lg">
            -{discountPercentage}%
          </div>
        ) : null}
        
        <img
          src={product.imageUrl || "https://placehold.co/300x300?text=No+Image"}
          alt={product.name}
          className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/300x300?text=No+Image";
          }}
        />
      </Link>

      {/* flex-grow giúp phần thân giãn đều và đẩy nút xuống dưới cùng */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Tên sản phẩm - Cố định chiều cao h-10 (tương đương 2 dòng chữ) để luôn thẳng hàng */}
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2 line-clamp-2 h-10 leading-snug">
          <Link to={productUrl} className="hover:text-primary transition-colors duration-200">
            {product.name}
          </Link>
        </h3>

        {/* Brand - Hiển thị tĩnh hoặc dùng khoảng trắng nếu không có để giữ vị trí thẳng hàng */}
        <p className="text-xs text-gray-400 dark:text-slate-400 mb-2 truncate">
          {product.brand ? `Thương hiệu: ${product.brand}` : '\u00A0'}
        </p>

        {/* Giá - Chiều cao cố định h-12 flex-col để căn đều kể cả khi có giảm giá hoặc không */}
        <div className="mb-4 h-12 flex flex-col justify-end">
          {product.originalPrice && Number(product.originalPrice) > Number(product.price) ? (
            <>
              <p className="text-xs text-gray-400 line-through leading-none mb-1">
                {Number(product.originalPrice).toLocaleString("vi-VN")} đ
              </p>
              <p className="text-base font-bold text-primary leading-none">
                {product.price ? Number(product.price).toLocaleString("vi-VN") : "0"} đ
              </p>
            </>
          ) : (
            <>
              <div className="h-3" /> {/* Khoảng trống bù chiều cao cho giá gốc */}
              <p className="text-base font-bold text-primary leading-none">
                {product.price ? Number(product.price).toLocaleString("vi-VN") : "0"} đ
              </p>
            </>
          )}
        </div>

        {/* Tình trạng kho - Hiển thị tĩnh */}
        <div className="mb-4 mt-auto">
          <p className="text-xs">
            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-500 dark:text-slate-400">
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
            </span>
          </p>
        </div>

        {/* Nút thêm vào giỏ */}
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={`w-full text-white text-sm font-semibold uppercase py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
            product.stock > 0 
              ? 'bg-primary hover:bg-red-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          aria-label={`Thêm ${product.name} vào giỏ hàng`}
        >
          <i className="fas fa-shopping-cart" />
          {product.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
        </button>
      </div>
    </div>
  );
}
