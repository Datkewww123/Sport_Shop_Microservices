// src/pages/AccountPage.jsx (Đã sửa hoàn chỉnh)
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/api"; // THÊM: Import fetchApi
import { toast } from "react-toastify"; // THÊM: Import toast

// (Component con cho nội dung Tab Profile) - ĐÃ SỬA để Cập nhật
function ProfileTab({ user }) {
  // State để quản lý dữ liệu form, sử dụng các trường từ user object
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  // Hàm xử lý nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HÀM GỌI API CẬP NHẬT PROFILE
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Endpoint: PUT /users/:id (Backend API để cập nhật thông tin)
      const updatedUser = await fetchApi(`/users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      // Trong một ứng dụng thật, bạn sẽ cần gọi hàm từ AuthContext
      // để cập nhật state currentUser trên toàn bộ ứng dụng (ví dụ: updateAuth(updatedUser)).
      // Ở đây, ta chỉ dựa vào thông báo và reload thủ công nếu cần.

      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật profile:", error);
      toast.error(error.message || "Cập nhật thất bại.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Thông tin tài khoản</h2>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold mb-1 dark:text-gray-200">
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold mb-1 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            readOnly
            className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold mb-1 dark:text-gray-200">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-bold mb-1 dark:text-gray-200">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

// Component chính
export default function AccountPage() {
  const { currentUser, logout } = useAuth();
  const { resetCart } = useCart();
  const navigate = useNavigate();

  // LOGIC BẢO VỆ LỘ TRÌNH (PRIVATE ROUTE)
  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    resetCart();
    logout();
    navigate("/");
  };

  if (currentUser === null) {
    return null;
  }

  // Nếu đã đăng nhập, hiển thị layout 2 cột
  return (
    <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-10 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Tài Khoản Của Bạn</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* CỘT TRÁI: MENU ĐIỀU HƯỚNG */}
        <div className="md:col-span-1">
          <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-900/50">
            <div className="w-full text-center p-3 rounded-md font-bold bg-primary text-white">
              Thông tin tài khoản
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left p-3 rounded-md font-bold text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: NỘI DUNG */}
        <div className="md:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50">
          <ProfileTab user={currentUser} />
        </div>
      </div>
    </div>
  );
}
