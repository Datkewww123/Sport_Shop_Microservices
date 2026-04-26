// src/components/ErrorMessage.jsx
import React from "react";

export default function ErrorMessage({ 
  message = "Đã có lỗi xảy ra", 
  onRetry = null,
  type = "error" // error, warning, info
}) {
  const iconMap = {
    error: "fa-exclamation-circle text-red-500",
    warning: "fa-exclamation-triangle text-yellow-500",
    info: "fa-info-circle text-blue-500"
  };

  const bgMap = {
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200"
  };

  return (
    <div className={`${bgMap[type]} border rounded-lg p-6 text-center my-8`}>
      <div className="mb-3">
        <i className={`fas ${iconMap[type]} text-4xl`} />
      </div>
      <p className="text-gray-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2"
        >
          <i className="fas fa-redo" />
          Thử lại
        </button>
      )}
    </div>
  );
}

// Empty State Component
export function EmptyState({ 
  icon = "fa-box-open",
  title = "Không có dữ liệu",
  message = "Chưa có nội dung nào để hiển thị",
  action = null
}) {
  return (
    <div className="text-center py-16 px-4">
      <div className="mb-4">
        <i className={`fas ${icon} text-6xl text-gray-300`} />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      {action && action}
    </div>
  );
}
