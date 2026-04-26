// Frontend/src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ element }) {
  const { currentUser } = useAuth();

  // 1. Nếu chưa đăng nhập, chuyển đến trang đăng nhập
  if (!currentUser) {
    return <Navigate to="/dang-nhap" replace />;
  }

  // 2. Nếu đã đăng nhập nhưng không phải admin, chuyển đến trang chủ
  if (currentUser.role !== "admin") {
    // Tạm thời cho họ về trang chủ và thông báo lỗi (role không được trả về trong mock user, nhưng giả định nó tồn tại)
    return <Navigate to="/" replace />;
  }

  // 3. Nếu là admin, hiển thị component
  return element;
}
