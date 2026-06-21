import React, { useState, useEffect } from "react";

export default function MockPaymentPage() {
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("0");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("orderId") || "");
    setAmount(params.get("amount") || "0");
  }, []);

  const handleSimulatePayment = (success) => {
    const resultCode = success ? "0" : "49";
    const message = success ? "Thanh toan thanh cong (Mock)" : "Giao dich bi huy boi nguoi dung (Mock)";
    const transId = "MOCK_" + Date.now();
    
    // Redirect to the backend return API to process the transaction and sync the DB
    window.location.href = `/api/payment/return?orderId=${orderId}&resultCode=${resultCode}&message=${encodeURIComponent(message)}&transId=${transId}&amount=${amount}`;
  };

  return (
    <div className="min-h-[500px] bg-gray-50 flex flex-col items-center justify-center p-6 my-10">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden border border-gray-150">
        
        {/* MoMo Header */}
        <div className="bg-[#A50064] text-white p-6 text-center relative">
          <div className="w-12 h-12 bg-white text-[#A50064] mx-auto rounded-xl flex items-center justify-center font-extrabold text-xl shadow-md mb-2 select-none">
            momo
          </div>
          <h1 className="text-lg font-bold">CỔNG GIẢ LẬP THANH TOÁN MOMO</h1>
          <p className="text-[10px] opacity-75 mt-0.5">Môi trường thử nghiệm Development</p>
        </div>

        {/* Order Info */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Mã giao dịch:</span>
              <span className="font-semibold text-gray-800 break-all text-right max-w-[200px]">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Nhà cung cấp:</span>
              <span className="font-semibold text-gray-800">THSPORT / SOAP Shop</span>
            </div>
            <div className="border-t border-dashed border-gray-200 my-2 pt-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Số tiền cần thanh toán:</span>
              <span className="text-lg font-bold text-[#A50064]">
                {Number(amount).toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </div>

          <div className="text-center text-xs text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-100 leading-relaxed">
            <i className="fas fa-exclamation-triangle mr-1"></i>
            Bạn đang ở chế độ giả lập. Nhấn một trong hai nút bên dưới để mô phỏng phản hồi từ phía cổng thanh toán MoMo.
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleSimulatePayment(true)}
              className="w-full bg-[#A50064] hover:bg-[#850050] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer text-sm"
            >
              Thanh toán thành công (Success)
            </button>
            <button
              onClick={() => handleSimulatePayment(false)}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl border border-gray-300 transition-all active:scale-[0.98] cursor-pointer text-sm"
            >
              Hủy thanh toán (Cancel)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-100">
          <p className="text-[9px] text-gray-400">
            Powered by SOAP Developer Sandbox Platform
          </p>
        </div>
      </div>
    </div>
  );
}
