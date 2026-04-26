// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Tạo một mảng các số trang, ví dụ: [1, 2, 3, ..., 20]
  // Logic này đơn giản, nó sẽ hiển thị tất cả các trang
  // (Logic phức tạp hơn với "..." sẽ cần sau)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Nếu chỉ có 1 trang, không cần hiển thị
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center mt-10 pt-6 border-t">
      <ul className="flex items-center gap-1">
        {/* Nút Quay lại (Previous) */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded-md disabled:opacity-50"
          >
            &laquo;
          </button>
        </li>

        {/* Các nút số trang */}
        {/* (Phiên bản đơn giản - hiển thị tối đa 7 nút) */}
        {pageNumbers.map((number) => {
          // Logic đơn giản để tránh quá nhiều nút
          if (
            number === 1 ||
            number === totalPages ||
            (number >= currentPage - 2 && number <= currentPage + 2)
          ) {
            return (
              <li key={number}>
                <button
                  onClick={() => onPageChange(number)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === number
                      ? "bg-primary text-white border-primary" // Nút được chọn
                      : "bg-white"
                  }`}
                >
                  {number}
                </button>
              </li>
            );
          }
          // Thêm dấu "..."
          if (number === currentPage - 3 || number === currentPage + 3) {
            return (
              <li key={number} className="px-2 py-2">
                ...
              </li>
            );
          }
          return null;
        })}

        {/* Nút Tiến (Next) */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded-md disabled:opacity-50"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
