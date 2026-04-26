// src/components/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, sortOrder, setSortOrder }) {
  // Các lựa chọn sắp xếp
  const sortOptions = [
    "Sản phẩm nổi bật",
    "Giá: Tăng dần",
    "Giá: Giảm dần",
    "Tên: A-Z",
    "Tên: Z-A",
    "Cũ nhất",
    "Mới nhất",
    "Bán chạy nhất",
  ];

  return (
    <main>
      {/* 1. Thanh Sắp xếp */}
      <div className="flex justify-end items-center mb-4">
        <label htmlFor="sort-by" className="text-sm mr-2">
          Sắp xếp theo:
        </label>
        <select
          id="sort-by"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Lưới sản phẩm - Grid 4 cột thông thoáng hơn */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
