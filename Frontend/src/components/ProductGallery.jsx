// src/components/ProductGallery.jsx
import React, { useState } from "react";

export default function ProductGallery({ images }) {
  // Nếu không có ảnh, trả về null
  if (!images || images.length === 0) {
    return <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>;
  }

  // State để theo dõi ảnh nào đang được chọn
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Ảnh chính */}
      <div className="w-full aspect-square border border-gray-200 rounded-lg overflow-hidden">
        <img
          src={activeImage}
          alt="Ảnh sản phẩm chính"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Hàng ảnh thumbnail */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((imgUrl, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(imgUrl)}
            className={`w-full aspect-square border rounded-md overflow-hidden transition-all ${
              activeImage === imgUrl
                ? "border-primary scale-105" // Nổi bật thumbnail đang chọn
                : "border-gray-200"
            }`}
          >
            <img
              src={imgUrl}
              alt={`Ảnh thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
