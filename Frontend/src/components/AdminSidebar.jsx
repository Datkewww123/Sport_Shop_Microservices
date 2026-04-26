// Frontend/src/components/AdminSidebar.jsx (Đã sửa)
import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", icon: "fas fa-home", name: "Về Trang Chủ", isExternal: true },
  { to: "/admin", icon: "fas fa-chart-line", name: "Tổng quan" },
  { to: "/admin/orders", icon: "fas fa-clipboard-list", name: "Đơn hàng" },
  { to: "/admin/products", icon: "fas fa-shoe-prints", name: "Sản phẩm" },
  { to: "/admin/users", icon: "fas fa-users", name: "Người dùng" },
  { to: "/admin/categories", icon: "fas fa-sitemap", name: "Danh mục & Hãng" },
  { to: "/admin/promotions", icon: "fas fa-tags", name: "Khuyến mãi" },
  { to: "/admin/news", icon: "fas fa-newspaper", name: "Tin tức" },
];

export default function AdminSidebar() {
  const baseClass = "flex items-center p-3 rounded-lg transition-colors";
  const activeClass = "bg-primary text-white";
  const inactiveClass = "text-gray-700 hover:bg-gray-100";

  return (
    // ĐÃ SỬA: Đặt top = 95px và h-full bằng calc() để chiếm hết phần còn lại của viewport
    <div className="w-64 bg-white p-4 shadow-lg sticky top-[95px] h-[calc(100vh-95px)] z-10">
      {/* Container cuộn được */}
      <div className="h-full overflow-y-auto pt-2">
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin" || link.to === "/"}
              className={({ isActive }) =>
                `${baseClass} ${
                  !link.isExternal && isActive ? activeClass : inactiveClass
                }`
              }
            >
              <i className={`${link.icon} w-5 text-center mr-3`} />
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
