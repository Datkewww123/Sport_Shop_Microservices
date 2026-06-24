// src/pages/OrderConfirmationPage.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const orderCode = location.state?.orderCode;

  // Web Audio API để tổng hợp âm thanh "ting" giống như khi thêm vào giỏ hàng
  const playChimeSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1318.51, now); // Nốt E6 trong trẻo, ting ting
      
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {
      console.warn("AudioContext blocked or not supported", e);
    }
  };

  useEffect(() => {
    // Phát âm thanh "ting" khi load trang đặt hàng thành công
    playChimeSound();
  }, []);

  return (
    <div className="min-h-dvh md:min-h-[75vh] bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4">
      {/* Container Card */}
      <div className="relative bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 lg:p-10 overflow-hidden border border-gray-100 dark:border-slate-700 animate-slide-up transform transition-all duration-300 text-center">
        
        {/* Bouncing success icon (giống hệt modal giỏ hàng) */}
        <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-green-100 dark:bg-green-950/40 rounded-full flex items-center justify-center text-green-500 dark:text-green-400 text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 lg:mb-5 shadow-inner mx-auto animate-bounce">
          <i className="fas fa-check-circle" />
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2 text-gray-800 dark:text-white">
          Đặt Hàng Thành Công!
        </h1>
        
        {/* Order Code banner if exists */}
        {orderCode && (
          <div className="inline-block bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-mono text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg border border-green-100 dark:border-green-800/40 mb-4 font-bold break-all">
            Mã đơn hàng: {orderCode}
          </div>
        )}

        {/* Description text */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-slate-400 leading-relaxed mb-5 sm:mb-6 lg:mb-8">
          Cảm ơn bạn đã mua sắm tại <strong>THSPORT</strong>. Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng và tiến hành giao hàng trong thời gian sớm nhất.
        </p>

        {/* Action Button */}
        <div className="space-y-3 sm:space-y-3.5">
          <Link
            to="/"
            className="w-full py-3 sm:py-3.5 lg:py-4 px-4 rounded-xl text-sm sm:text-base font-bold bg-primary hover:bg-red-700 text-white text-center shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all block cursor-pointer"
          >
            Quay về Trang chủ
          </Link>
          <Link
            to="/don-hang"
            className="w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm lg:text-base font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 transition-colors block text-center"
          >
            Xem lịch sử đơn hàng
          </Link>
        </div>

      </div>
    </div>
  );
}
