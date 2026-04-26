// Frontend/src/pages/admin/AdminUsersPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { fetchApi } from "../../utils/api";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      // API lấy tất cả người dùng (Admin)
      const response = await fetchApi(`/admin/users?page=${page}&limit=20`);
      const data = response.data || response;
      setUsers(data.users || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
    } catch (error) {
      toast.error("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (newPage) => {
    fetchUsers(newPage);
  };

  const handleDeleteUser = async (userId, userName) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa tài khoản của người dùng ${userName}?`
      )
    ) {
      try {
        // API xóa người dùng
        await fetchApi(`/users/${userId}`, { method: "DELETE" });
        toast.success(`Đã xóa người dùng ${userName} thành công.`);
        fetchUsers(pagination.page); // Tải lại trang hiện tại
      } catch (error) {
        toast.error(error.message || "Xóa người dùng thất bại.");
      }
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">Đang tải danh sách người dùng...</div>
    );

  return (
    <div>
      <div className="mb-4">
        <span className="font-medium text-gray-600">
          Tổng cộng: {pagination.total} người dùng
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đăng ký
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    className="text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                    disabled={user.role === "admin"} // Ngăn không cho xóa admin khác
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
