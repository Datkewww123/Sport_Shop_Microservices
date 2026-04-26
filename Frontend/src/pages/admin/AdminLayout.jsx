// Frontend/src/pages/admin/AdminLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout() {
  const location = useLocation();

  // Tùy chỉnh tiêu đề dựa trên route
  const getTitle = () => {
    if (location.pathname === "/admin") return "Tổng quan";
    if (location.pathname.startsWith("/admin/orders"))
      return "Quản lý Đơn hàng";
    if (location.pathname.startsWith("/admin/products"))
      return "Quản lý Sản phẩm";
    if (location.pathname.startsWith("/admin/users"))
      return "Quản lý Người dùng";
    if (location.pathname.startsWith("/admin/categories"))
      return "Quản lý Danh mục & Hãng";
    if (location.pathname.startsWith("/admin/promotions"))
      return "Quản lý Khuyến mãi";
    if (location.pathname.startsWith("/admin/news")) return "Quản lý Tin tức";
    return "Dashboard Admin";
  };

  return (
    // FIX 2: Thêm margin-top cho toàn bộ nội dung Admin Layout
    // để đẩy nội dung xuống dưới fixed Header (95px)
    <div className="min-h-screen bg-gray-50 mt-[95px] flex">
      {/* Sidebar giờ đã được offset top-[95px] */}
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
          {getTitle()}
        </h1>
        <Outlet />
      </main>
    </div>
  );
}
