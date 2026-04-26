// src/pages/OrderConfirmationPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmationPage() {
  return (
    <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Đặt hàng thành công!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Cảm ơn bạn đã mua hàng tại THSPORT. Chúng tôi sẽ liên hệ với bạn để xác
        nhận đơn hàng trong thời gian sớm nhất.
      </p>
      <Link
        to="/"
        className="bg-primary text-white py-3 px-6 rounded-md font-bold hover:bg-primary-dark"
      >
        Quay về Trang chủ
      </Link>
    </div>
  );
}
