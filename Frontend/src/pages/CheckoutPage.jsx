// src/pages/CheckoutPage.jsx (Đã sửa đổi)
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // THÊM: Import useAuth
import { fetchApi } from "../utils/api"; // THÊM: Import fetchApi
import { toast } from "react-toastify"; // THÊM: Import toast

// Component con nội bộ cho 1 hàng sản phẩm tóm tắt
function OrderSummaryItem({ item }) {
  return (
    <div className="flex justify-between items-center py-3 border-b">
      <div className="flex items-center gap-3">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-14 h-14 object-cover rounded-md border"
        />
        <div>
          <p className="font-bold text-sm max-w-[200px] truncate">
            {item.name}
          </p>
          <p className="text-xs text-gray-500">
            Số lượng: {item.quantity}
            {item.selectedSize && <span> / Size: {item.selectedSize}</span>}
          </p>
        </div>
      </div>
      <p className="font-bold text-sm">
        {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
      </p>
    </div>
  );
}

// Component chính
export default function CheckoutPage() {
  const { cartItems, totalPrice, cartCount, clearCart } = useCart();
  const { currentUser } = useAuth(); // Lấy người dùng hiện tại
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Mặc định là COD
  const [formData, setFormData] = useState({
    fullName: currentUser ? currentUser.name : "",
    email: currentUser ? currentUser.email : "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    note: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi người dùng nhấn "Hoàn tất đơn hàng"
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // 1. Kiểm tra trạng thái giỏ hàng và đăng nhập
    if (cartCount === 0) {
      toast.error("Giỏ hàng trống.");
      return;
    }
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để đặt hàng.");
      navigate("/dang-nhap");
      return;
    }

    // 2. Validate form
    if (!formData.fullName || !formData.phone || !formData.province || !formData.district || !formData.street) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. Chuẩn bị dữ liệu cho API theo cấu trúc Order Model của Backend
      const orderItems = cartItems.map((item) => ({
        productId: item.originalProductId || item.id, // Sử dụng ID sản phẩm thật từ Backend
        name: item.name,
        price: item.price,
        image: item.imageUrl,
        quantity: item.quantity,
        selectedSize: item.selectedSize || null,
      }));

      const orderPayload = {
        items: orderItems,
        subtotal: totalPrice,
        shippingFee: 0, // Có thể tính phí ship sau
        discount: 0, // Có thể thêm mã giảm giá sau
        total: totalPrice,
        paymentMethod: paymentMethod,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          province: formData.province,
          district: formData.district,
          ward: formData.ward || "",
          street: formData.street,
          note: formData.note || "",
        },
        customerNote: formData.note || "",
      };

      console.log('Order payload:', orderPayload);

      // 4. Gọi API tạo đơn hàng
      const response = await fetchApi("/orders", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      });

      console.log('Order response:', response);

      // 5. Thành công: Xóa giỏ hàng
      await clearCart();

      // 6. Hiển thị thông báo thành công
      toast.success(`Đặt hàng thành công! Mã đơn hàng: ${response.data?.orderCode || ''}`);

      // 7. Chuyển người dùng đến trang "Cảm ơn"
      setTimeout(() => {
        navigate("/dat-hang-thanh-cong");
      }, 1500);
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error(error.message || "Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Nếu giỏ hàng rỗng, không cho thanh toán
  if (cartCount === 0) {
    return (
      <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Giỏ hàng của bạn đang trống</h1>
        <Link to="/" className="text-lg text-primary hover:underline">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  // Layout 2 cột
  return (
    <div className="bg-gray-100 py-10">
      <div className="container w-[90%] max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* === CỘT TRÁI (FORM) === */}
        <form
          onSubmit={handlePlaceOrder}
          className="md:col-span-3 flex flex-col gap-6"
        >
          <h1 className="text-2xl font-bold">Thông tin giao hàng</h1>

          {/* Form thông tin - SỬ DỤNG CONTROLLED COMPONENTS */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên *"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="col-span-2 p-3 border rounded-md focus:border-primary focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email *"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="col-span-1 p-3 border rounded-md focus:border-primary focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại *"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10,11}"
                title="Vui lòng nhập số điện thoại hợp lệ (10-11 số)"
                className="col-span-1 p-3 border rounded-md focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Tỉnh/Thành phố *"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                required
                className="col-span-1 p-3 border rounded-md focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Quận/Huyện *"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                required
                className="col-span-1 p-3 border rounded-md focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phường/Xã *"
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
                required
                className="col-span-2 p-3 border rounded-md focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder="Địa chỉ chi tiết (Số nhà, tên đường) *"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required
                className="col-span-2 p-3 border rounded-md focus:border-primary focus:outline-none"
              />
              <textarea
                placeholder="Ghi chú thêm (tùy chọn)"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows="3"
                className="col-span-2 p-3 border rounded-md focus:border-primary focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Form phương thức thanh toán */}
          <h2 className="text-2xl font-bold">Phương thức thanh toán</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4">
            {/* Lựa chọn 1: COD */}
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`border p-4 rounded-md cursor-pointer transition-all ${
                paymentMethod === "cod" ? "border-primary bg-red-50" : "hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
                <span className="font-bold">Thanh Toán Khi Nhận Hàng (COD)</span>
              </div>
              {paymentMethod === "cod" && (
                <p className="text-sm text-gray-600 mt-3 pl-8">
                  Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng tại nhà.
                </p>
              )}
            </div>

            {/* Lựa chọn 2: Chuyển khoản ngân hàng */}
            <div
              onClick={() => setPaymentMethod("bank_transfer")}
              className={`border p-4 rounded-md cursor-pointer transition-all ${
                paymentMethod === "bank_transfer" ? "border-primary bg-red-50" : "hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
                  <span className="font-bold">Chuyển khoản ngân hàng</span>
              </div>

              {paymentMethod === "bank_transfer" && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="font-bold mb-3 text-center">Quét mã QR để thanh toán</p>
                  <div className="flex justify-center">
                    <img
                      src={`https://img.vietqr.io/image/970415-0981972950-compact2.png?amount=${totalPrice}&addInfo=THANHTOAN`}
                      alt="Mã QR Chuyển khoản"
                      className="w-64 h-auto border rounded-lg"
                    />
                  </div>
                  <div className="mt-4 text-sm text-center space-y-1">
                    <p><strong>Ngân hàng:</strong> Vietinbank</p>
                    <p><strong>Số tài khoản:</strong> 0981972950</p>
                    <p><strong>Chủ tài khoản:</strong> NGUYEN QUANG TU</p>
                    <p className="text-primary font-semibold mt-2">
                      Nội dung: THANHTOAN [Mã đơn hàng của bạn]
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Lựa chọn 3: VNPay (Coming Soon) */}
            <div className="border p-4 rounded-md bg-gray-100 cursor-not-allowed opacity-60">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  disabled
                  className="w-5 h-5"
                />
                
                <span className="font-bold text-gray-500">VNPay</span>
              </div>
            </div>

            {/* Lựa chọn 4: MoMo (Coming Soon) */}
            <div className="border p-4 rounded-md bg-gray-100 cursor-not-allowed opacity-60">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  disabled
                  className="w-5 h-5"
                />
                <span className="font-bold text-gray-500 text-2xl">MoMo </span>
              </div>
            </div>
          </div>

          {/* Nút Hoàn tất */}
          <div className="flex justify-between items-center mt-4">
            <Link
              to="/gio-hang"
              className="text-sm text-primary hover:underline"
            >
              Giỏ hàng
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-primary text-white text-lg font-bold uppercase py-4 px-6 rounded-md transition-colors ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-700"
              }`}
            >
              {isSubmitting ? "Đang xử lý..." : "Hoàn tất đơn hàng"}
            </button>
          </div>
        </form>

        {/* === CỘT PHẢI (TÓM TẮT ĐƠN HÀNG) === */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-4">
            Đơn hàng ({cartCount} sản phẩm)
          </h2>

          {/* Danh sách sản phẩm tóm tắt */}
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {cartItems.map((item) => (
              <OrderSummaryItem key={item.id} item={item} />
            ))}
          </div>

          {/* Mã giảm giá */}
          <div className="flex gap-2 mt-4 py-4 border-t border-b">
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="flex-grow p-3 border rounded-md"
            />
            <button className="bg-gray-300 text-gray-700 font-bold px-4 rounded-md">
              Sử dụng
            </button>
          </div>

          {/* Tổng tiền */}
          <div className="py-4 border-b">
            <div className="flex justify-between text-gray-700">
              <span>Tạm tính:</span>
              <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Phí vận chuyển:</span>
              <span>—</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl pt-4 mt-4">
            <span>Tổng cộng:</span>
            <span className="text-2xl">
              {totalPrice.toLocaleString("vi-VN")} ₫
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
