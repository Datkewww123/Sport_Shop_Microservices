import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchApi } from "../utils/api";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  // Forgot password state (2 bước)
  const [forgotStep, setForgotStep] = useState(1); // 1: nhập email, 2: nhập mk mới
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      toast.success("Đăng nhập thành công!");
      if (user && user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Sai email hoặc mật khẩu!");
    }
  };

  // Bước 1: kiểm tra email
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Vui lòng nhập email.");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await fetchApi("/auth/check-email", {
        method: "POST",
        body: JSON.stringify({ email: forgotEmail }),
      });
      if (res.success) {
        setForgotStep(2);
      } else {
        toast.error(res.message || "Không tìm thấy tài khoản với email này.");
      }
    } catch (error) {
      toast.error(error.message || "Không tìm thấy tài khoản với email này.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Bước 2: đặt lại mật khẩu
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotNewPassword || forgotNewPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await fetchApi("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email: forgotEmail, newPassword: forgotNewPassword }),
      });
      if (res.success) {
        toast.success("Đặt lại mật khẩu thành công! Hãy đăng nhập lại.");
        setShowForgot(false);
        setForgotStep(1);
        setForgotEmail("");
        setForgotNewPassword("");
        setForgotConfirmPassword("");
      } else {
        toast.error(res.message || "Đặt lại mật khẩu thất bại.");
      }
    } catch (error) {
      toast.error(error.message || "Đặt lại mật khẩu thất bại.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgot(false);
    setForgotStep(1);
    setForgotEmail("");
    setForgotNewPassword("");
    setForgotConfirmPassword("");
  };

  return (
    <div className="container w-[90%] max-w-[500px] mx-auto mt-10 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Đăng Nhập</h1>

      {!showForgot ? (
        /* ─── Form Đăng nhập ─────────────────────────── */
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-1 dark:text-gray-200">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="user@test.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-1 dark:text-gray-200">
              Mật khẩu *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-bold uppercase py-3 px-6 rounded-md transition-colors hover:bg-primary-dark mt-4"
          >
            Đăng nhập
          </button>

          {/* Quên mật khẩu */}
          <p className="text-center mt-1">
            <button
              type="button"
              onClick={() => { setShowForgot(true); setForgotStep(1); }}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors underline-offset-2 hover:underline"
            >
              Quên mật khẩu?
            </button>
          </p>

          <p className="text-center mt-1 text-sm dark:text-gray-300">
            Chưa có tài khoản?{" "}
            <Link
              to="/dang-ky"
              className="text-primary hover:underline font-bold"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      ) : (
        /* ─── Form Quên mật khẩu ─────────────────────── */
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50">
          <h2 className="text-xl font-bold text-center mb-2 dark:text-white">Đặt lại mật khẩu</h2>

          {forgotStep === 1 ? (
            /* ── Bước 1: Nhập email ── */
            <form onSubmit={handleCheckEmail} className="flex flex-col gap-4 mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Nhập email tài khoản của bạn để kiểm tra.
              </p>
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-bold mb-1 dark:text-gray-200">
                  Email *
                </label>
                <input
                  type="email"
                  id="forgot-email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  placeholder="email@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full bg-primary text-white text-lg font-bold uppercase py-3 px-6 rounded-md transition-colors hover:bg-primary-dark mt-2 disabled:opacity-60"
              >
                {forgotLoading ? "Đang kiểm tra..." : "Kiểm tra email"}
              </button>
              <p className="text-center mt-1">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors underline-offset-2 hover:underline"
                >
                  ← Quay lại đăng nhập
                </button>
              </p>
            </form>
          ) : (
            /* ── Bước 2: Nhập mật khẩu mới ── */
            <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 mt-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3 text-center">
                <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                  <i className="fas fa-check-circle mr-1" />
                  Email {forgotEmail} hợp lệ!
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Nhập mật khẩu mới bạn muốn đặt.
              </p>
              <div>
                <label htmlFor="forgot-new-password" className="block text-sm font-bold mb-1 dark:text-gray-200">
                  Mật khẩu mới *
                </label>
                <input
                  type="password"
                  id="forgot-new-password"
                  required
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  placeholder="Ít nhất 6 ký tự"
                />
              </div>
              <div>
                <label htmlFor="forgot-confirm-password" className="block text-sm font-bold mb-1 dark:text-gray-200">
                  Xác nhận mật khẩu mới *
                </label>
                <input
                  type="password"
                  id="forgot-confirm-password"
                  required
                  value={forgotConfirmPassword}
                  onChange={(e) => setForgotConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full bg-primary text-white text-lg font-bold uppercase py-3 px-6 rounded-md transition-colors hover:bg-primary-dark mt-2 disabled:opacity-60"
              >
                {forgotLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </button>
              <p className="text-center mt-1">
                <button
                  type="button"
                  onClick={() => setForgotStep(1)}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors underline-offset-2 hover:underline"
                >
                  ← Quay lại nhập email
                </button>
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
