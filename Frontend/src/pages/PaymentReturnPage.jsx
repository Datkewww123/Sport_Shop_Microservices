import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const resultCode = searchParams.get('resultCode');
    const statusParam = searchParams.get('status');

    if (statusParam) {
      setStatus(statusParam);
    } else if (resultCode === '0') {
      setStatus('success');
    } else if (resultCode) {
      setStatus('failed');
    }
  }, [searchParams]);

  return (
    <div className="container w-[90%] max-w-[600px] mx-auto mt-20 py-20 text-center">
      {status === 'processing' && (
        <div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Đang xử lý thanh toán...</h1>
          <p className="text-gray-600">Vui lòng chờ trong giây lát.</p>
        </div>
      )}

      {status === 'success' && (
        <div>
          <div className="text-green-500 text-8xl mb-6">&#10003;</div>
          <h1 className="text-2xl font-bold mb-4">Thanh toán thành công!</h1>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã thanh toán. Đơn hàng sẽ được xử lý sớm nhất.</p>
          <Link
            to="/tai-khoan"
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors"
          >
            Xem đơn hàng
          </Link>
        </div>
      )}

      {status === 'failed' && (
        <div>
          <div className="text-red-500 text-8xl mb-6">&times;</div>
          <h1 className="text-2xl font-bold mb-4">Thanh toán thất bại</h1>
          <p className="text-gray-600 mb-2">Không thể hoàn tất thanh toán.</p>
          <p className="text-sm text-gray-500 mb-6">{searchParams.get('message') || 'Vui lòng thử lại.'}</p>
          <Link
            to="/thanh-toan"
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors"
          >
            Thử lại
          </Link>
        </div>
      )}
    </div>
  );
}
