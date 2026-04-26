// src/pages/RegisterPage.jsx (Đã sửa hoàn chỉnh)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function RegisterPage() {
  // KHẮC PHỤC LỖI: Bổ sung 4 biến state bị thiếu/xóa
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Lỗi xảy ra do thiếu biến này

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Lỗi xảy ra tại đây
      toast.error("Mật khẩu không khớp!");
      return;
    }

    try {
      await register(name, email, password);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/dang-nhap");
    } catch (error) {
      toast.error(error.message || "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container w-[90%] max-w-[500px] mx-auto mt-10 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Tạo Tài Khoản Mới</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-bold mb-1">
            Họ và tên *
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold mb-1">
            Mật khẩu *
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-bold mb-1"
          >
            Xác nhận mật khẩu *
          </label>
          <input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white text-lg font-bold uppercase py-3 px-6 rounded-md transition-colors hover:bg-primary-dark mt-4"
        >
          Đăng ký
        </button>

        <p className="text-center mt-2 text-sm">
          Đã có tài khoản?{" "}
          <Link
            to="/dang-nhap"
            className="text-primary hover:underline font-bold"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
}
