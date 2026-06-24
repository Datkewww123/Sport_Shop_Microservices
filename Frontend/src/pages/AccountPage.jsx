// src/pages/AccountPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/api";
import { toast } from "react-toastify";

// Component Thông tin tài khoản + Đổi mật khẩu
function ProfileTab({ user }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  // Đổi mật khẩu state
  const [pwForm, setPwForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwLoading, setPwLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await fetchApi(`/users/${user._id || user.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error(error.message || "Cập nhật thất bại.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!pwForm.oldPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      toast.error("Vui lòng điền đầy đủ các trường mật khẩu.");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    setPwLoading(true);
    try {
      const res = await fetchApi("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          oldPassword: pwForm.oldPassword,
          newPassword: pwForm.newPassword,
        }),
      });
      if (res.success) {
        toast.success("Đổi mật khẩu thành công!");
        setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.message || "Đổi mật khẩu thất bại.");
      }
    } catch (error) {
      toast.error(error.message || "Mật khẩu cũ không đúng.");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Thông tin tài khoản ── */}
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
            <label htmlFor="acc-email" className="block text-sm font-bold mb-1 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="acc-email"
              value={user.email}
              readOnly
              className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed"
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
            Cập nhật thông tin
          </button>
        </form>
      </div>

      {/* ── Đường kẻ ngăn cách ── */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* ── Đặt lại mật khẩu ── */}
      <div>
        <h2 className="text-xl font-bold mb-1 dark:text-white">Đặt lại mật khẩu</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Nhập mật khẩu cũ để xác nhận, sau đó đặt mật khẩu mới.
        </p>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="old-password" className="block text-sm font-bold mb-1 dark:text-gray-200">
              Mật khẩu cũ *
            </label>
            <input
              type="password"
              id="old-password"
              name="oldPassword"
              value={pwForm.oldPassword}
              onChange={handlePwChange}
              required
              autoComplete="current-password"
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-bold mb-1 dark:text-gray-200">
              Mật khẩu mới *
            </label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              value={pwForm.newPassword}
              onChange={handlePwChange}
              required
              autoComplete="new-password"
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-bold mb-1 dark:text-gray-200">
              Xác nhận mật khẩu mới *
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={pwForm.confirmPassword}
              onChange={handlePwChange}
              required
              autoComplete="new-password"
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          <button
            type="submit"
            disabled={pwLoading}
            className="bg-gray-800 dark:bg-gray-600 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors disabled:opacity-60"
          >
            {pwLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Component chính
export default function AccountPage() {
  const { currentUser, logout } = useAuth();
  const { resetCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    resetCart();
    logout();
    navigate("/");
  };

  if (currentUser === null) {
    return null;
  }

  return (
    <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-10 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Tài Khoản Của Bạn</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* CỘT TRÁI: MENU */}
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
