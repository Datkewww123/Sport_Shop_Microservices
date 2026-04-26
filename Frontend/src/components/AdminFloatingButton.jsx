// Frontend/src/components/AdminFloatingButton.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminFloatingButton() {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Không hiển thị nếu không phải admin
  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  // Không hiển thị nếu đang ở trang admin
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Link
      to="/admin"
      className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-50 group"
      title="Đi tới trang quản lý Admin"
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <i className="fas fa-user-shield text-2xl"></i>
        <span className="font-bold text-sm hidden group-hover:inline-block animate-fade-in">
          Quản lý Admin
        </span>
      </div>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
    </Link>
  );
}
