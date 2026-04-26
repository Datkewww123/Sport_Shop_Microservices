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
    // Card phóng to mạnh hơn khi hover
    <div className="product-card bg-white rounded-xl shadow-sm hover:shadow-2xl overflow-visible transition-all duration-300 group border border-gray-100 hover:scale-110 hover:z-20 relative">
      <Link to={productUrl} className="block relative overflow-hidden bg-gray-50 rounded-t-xl">
        {/* Discount Badge */}
        {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold z-10 shadow-lg">
            -{discountPercentage}%
          </div>
        )}
        
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="p-5 group-hover:p-6 transition-all duration-300">
        {/* Tên sản phẩm */}
        <h3 className="text-sm group-hover:text-base font-semibold text-gray-700 mb-3 line-clamp-2 group-hover:line-clamp-none leading-relaxed transition-all duration-300">
          <Link to={productUrl} className="hover:text-primary transition-colors duration-200">
            {product.name}
          </Link>
        </h3>

        {/* Brand - Hiện khi hover */}
        {product.brand && (
          <p className="text-xs text-gray-500 mb-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-10 overflow-hidden transition-all duration-300">
            Thương hiệu: <span className="font-medium">{product.brand}</span>
          </p>
        )}

        {/* Giá */}
        <div className="mb-4 space-y-1">
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <p className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString("vi-VN")}₫
              </p>
              <p className="text-lg group-hover:text-xl font-bold text-primary transition-all duration-300">
                {product.price ? product.price.toLocaleString("vi-VN") : "0"}₫
              </p>
            </>
          ) : (
            <p className="text-lg group-hover:text-xl font-bold text-primary transition-all duration-300">
              {product.price ? product.price.toLocaleString("vi-VN") : "0"}₫
            </p>
          )}
        </div>

        {/* Mô tả ngắn - Hiện khi hover */}
        {product.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
            {product.description}
          </p>
        )}

        {/* Tình trạng kho - Hiện always */}
        <div className="mb-3">
          <p className="text-xs">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-600">
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
              ? 'bg-gray-800 hover:bg-primary' 
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
