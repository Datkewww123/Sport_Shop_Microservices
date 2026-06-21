import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchApi } from '../utils/api';

export default function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [orderCode, setOrderCode] = useState('');
  
  const orderId = searchParams.get('orderId') || '';

  // Play ting sound on success
  const playChimeSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1318.51, now);
      
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
    const resultCode = searchParams.get('resultCode');
    const statusParam = searchParams.get('status');

    let currentStatus = 'processing';
    if (statusParam) {
      currentStatus = statusParam;
    } else if (resultCode === '0' || resultCode === 0) {
      currentStatus = 'success';
    } else if (resultCode) {
      currentStatus = 'failed';
    }
    
    setStatus(currentStatus);
    
    if (currentStatus === 'success') {
      playChimeSound();
    }
  }, [searchParams]);

  // Fetch human-readable orderCode
  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const res = await fetchApi(`/orders/${orderId}`);
        // The API returns the order object
        if (res && (res.orderCode || res.data?.orderCode)) {
          setOrderCode(res.orderCode || res.data.orderCode);
        }
      } catch (err) {
        console.warn('Failed to fetch order details:', err.message);
      }
    };
    if (orderId) {
      getOrderDetails();
    }
  }, [orderId]);

  return (
    <div className="min-h-[75vh] bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      {/* Container Card */}
      <div className="relative bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-2xl shadow-2xl w-full max-w-md p-8 overflow-hidden border border-gray-100 dark:border-slate-700 animate-slide-up transform transition-all duration-300 text-center">
        
        {status === 'processing' && (
          <div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-6" />
            <h1 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
              Đang Xử Lý Thanh Toán...
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Vui lòng chờ trong giây lát, hệ thống đang cập nhật kết quả.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            {/* Bouncing Success Icon */}
            <div className="w-20 h-20 bg-green-100 dark:bg-green-950/40 rounded-full flex items-center justify-center text-green-500 dark:text-green-400 text-4xl mb-4 shadow-inner mx-auto animate-bounce">
              <i className="fas fa-check-circle" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-gray-800 dark:text-white">
              Thanh Toán Thành Công!
            </h1>

            {/* Order Code Banner */}
            {orderCode && (
              <div className="inline-block bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-mono text-sm px-4 py-1.5 rounded-lg border border-green-100 dark:border-green-800/40 mb-4 font-bold">
                Mã đơn hàng: {orderCode}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
              Cảm ơn bạn đã hoàn tất thanh toán cho đơn hàng tại <strong>THSPORT</strong>. Chúng tôi đang xử lý đơn hàng để bàn giao cho đối tác vận chuyển trong thời gian sớm nhất.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/"
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-primary hover:bg-red-700 text-white text-center shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all block cursor-pointer"
              >
                Quay về Trang chủ
              </Link>
              <Link
                to="/don-hang"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 transition-colors block text-center"
              >
                Xem lịch sử đơn hàng
              </Link>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div>
            {/* Bouncing Failure Icon */}
            <div className="w-20 h-20 bg-red-100 dark:bg-red-950/40 rounded-full flex items-center justify-center text-red-500 dark:text-red-400 text-4xl mb-4 shadow-inner mx-auto animate-bounce">
              <i className="fas fa-times-circle" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-gray-800 dark:text-white">
              Thanh Toán Thất Bại
            </h1>

            {/* Error reason */}
            <div className="inline-block bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs px-4 py-1.5 rounded-lg border border-red-100 dark:border-red-800/40 mb-4">
              Lý do: {searchParams.get('message') || 'Thanh toán bị hủy hoặc không thành công'}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
              Giao dịch thanh toán chưa thể hoàn thành. Vui lòng bấm vào nút dưới đây để kiểm tra lại giỏ hàng và thanh toán lại đơn hàng.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/gio-hang"
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-primary hover:bg-red-700 text-white text-center shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all block cursor-pointer"
              >
                Vào Giỏ hàng / Thử lại
              </Link>
              <Link
                to="/"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 transition-colors block text-center"
              >
                Quay về Trang chủ
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
