// Frontend/src/pages/admin/AdminDashboardPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { fetchApi } from "../../utils/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // THÊM Link

// Component con hiển thị 1 thống kê
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color} flex items-center justify-between`}
  >
    {/* ... (Giữ nguyên StatCard) ... */}
  </div>
);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... (fetchStats function remains the same, using /admin/stats)

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetchApi("/admin/stats");
      // Backend trả về trực tiếp object hoặc wrapped trong {success, data}
      const statsData = response.data || response;
      
      // Đảm bảo recentOrders luôn là array
      setStats({
        ...statsData,
        recentOrders: statsData.recentOrders || []
      });
    } catch (error) {
      console.error("Lỗi khi tải thống kê:", error);
      if (error.status === 403) {
        toast.error("Bạn không có quyền truy cập Dashboard Admin.");
      } else {
        toast.error("Không thể tải dữ liệu Dashboard.");
      }
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ... (Loading state handling)
  if (loading) {
    return (
      <div className="text-center py-20 text-xl">Đang tải Dashboard...</div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-20 text-xl text-red-500">
        Không thể tải Dashboard. Hãy kiểm tra quyền Admin.
      </div>
    );
  }

  // Format tiền tệ cho dễ đọc
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return "0 ₫";
    }
    return Number(amount).toLocaleString("vi-VN") + " ₫";
  };

  return (
    <div>
      {/* 1. KHU VỰC THỐNG KÊ CHUNG */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* ... (Các StatCard) */}
        <StatCard
          title="Tổng Doanh Thu"
          value={formatCurrency(stats.totalRevenue)}
          icon="fas fa-money-bill-wave"
          color="border-l-green-500"
        />
        <StatCard
          title="Tổng Đơn Hàng"
          value={stats.totalOrders}
          icon="fas fa-shopping-cart"
          color="border-l-blue-500"
        />
        <StatCard
          title="Đơn Hàng Chờ"
          value={stats.pendingOrders}
          icon="fas fa-clock"
          color="border-l-yellow-500"
        />
        <StatCard
          title="Tổng Sản Phẩm"
          value={stats.totalProducts}
          icon="fas fa-shoe-prints"
          color="border-l-red-500"
        />
      </div>

      {/* 2. ĐƠN HÀNG GẦN ĐÂY */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">5 Đơn Hàng Gần Đây</h2>
        {/* ... (Logic hiển thị đơn hàng gần đây) */}
        <div className="space-y-3">
          {stats.recentOrders && stats.recentOrders.length > 0 ? (
            stats.recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="text-sm">
                  <p className="font-bold">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-gray-500">{order.user?.name || 'N/A'}</p>
                </div>
                <div className="text-right">
                  {/* Backend dùng total */}
                  <p className="font-bold text-lg text-green-700">
                    {formatCurrency(order.total)}
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Chưa có đơn hàng nào</p>
          )}
        </div>
        <div className="mt-4 text-right">
          <Link
            to="/admin/orders"
            className="text-primary font-medium hover:underline"
          >
            Xem tất cả đơn hàng &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
}
