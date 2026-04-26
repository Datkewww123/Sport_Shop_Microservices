import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchApi } from "../utils/api";
import SearchAutocomplete from "./SearchAutocomplete";

export default function Header() {
  const { cartCount } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);

  const fetchMenuData = useCallback(async () => {
    try {
      // Chờ cả hai lời gọi API hoàn thành
      const [catsResponse, brsResponse] = await Promise.all([
        fetchApi("/categories"), // Endpoint lấy danh mục
        fetchApi("/brands"), // Endpoint lấy thương hiệu
      ]);
      
      // Xử lý response format (cả mới và cũ)
      const cats = catsResponse?.data || catsResponse || [];
      const brs = brsResponse?.data || brsResponse || [];
      
      setCategories(cats);
      setBrands(brs);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu menu:", error);
      // Không crash app nếu menu load lỗi
      setCategories([]);
      setBrands([]);
    } finally {
      setLoadingMenu(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  return (
    <header>
      <div className="bg-[#f8f9fa] py-2 text-xs text-center border-b border-b-[#e7e7e7]">
        {/* Dịch: .container */}
        <div className="w-[90%] max-w-[1400px] mx-auto">
          HỆ THỐNG BÁN GIÀY CHÍNH HÃNG NHIỀU NĂM HÌNH THÀNH VÀ PHÁT TRIỂN
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <div className="bg-dark-color py-[15px] text-white">
        <div className="w-[90%] max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-[28px] font-bold uppercase">
            TH<span className="text-logo-yellow">SPORT</span>
          </Link>
          {/* SearchAutocomplete với dropdown gợi ý */}
          <SearchAutocomplete />
          {/* ===== USER ACTIONS ===== */}
          <div className="flex items-center">
            {/* (MỚI) Hiển thị khác nhau dựa trên trạng thái đăng nhập */}
            {currentUser ? (
              // --- NẾU ĐÃ ĐĂNG NHẬP ---
              <div className="action-item relative group cursor-pointer text-center ml-5">
                <i className="fa fa-user-check text-2xl text-logo-yellow" />
                <div className="text-xs truncate max-w-[100px]">
                  {currentUser.name}
                </div>
                {/* Dropdown ĐÃ ĐĂNG NHẬP */}
                <div className="user-dropdown hidden group-hover:block absolute top-full right-0 bg-[#222] min-w-[200px] shadow-lg z-[1000] text-left">
                  <ul>
                    {/* Hiển thị link Admin nếu user có role admin */}
                    {currentUser.role === "admin" && (
                      <li>
                        <Link
                          to="/admin"
                          className="block py-3 px-4 text-logo-yellow text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] font-bold"
                        >
                          <i className="fas fa-user-shield mr-2"></i>
                          Quản lý Admin
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        to="/tai-khoan"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/gio-hang"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Giỏ hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/thanh-toan"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Thanh toán
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tra-cuu-don-hang"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Tra cứu đơn hàng
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full text-left py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              // --- NẾU CHƯA ĐĂNG NHẬP ---
              <div className="action-item relative group cursor-pointer text-center ml-5">
                <i className="fa fa-user text-2xl" />
                <div className="text-xs">Tài khoản</div>
                {/* Dropdown CHƯA ĐĂNG NHẬP */}
                <div className="user-dropdown hidden group-hover:block absolute top-full right-0 bg-[#222] min-w-[200px] shadow-lg z-[1000] text-left">
                  <ul>
                    <li>
                      <Link
                        to="/dang-ky"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Đăng ký
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dang-nhap"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Đăng nhập
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/gio-hang"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Giỏ hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/thanh-toan"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Thanh toán
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tra-cuu-don-hang"
                        className="block py-3 px-4 text-white text-sm border-b border-b-[#444] transition-colors hover:bg-[#555] last:border-b-0"
                      >
                        Tra cứu đơn hàng
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <Link
              to="/gio-hang" // 1. Thêm "to" để chỉ định đường dẫn
              className="action-item relative cursor-pointer text-center ml-5" // 2. Giữ nguyên className
            >
              <i className="fa fa-shopping-cart text-2xl" />
              <span className="cart-count absolute -top-1 -right-2.5 bg-primary text-white rounded-full w-5 h-5 text-xs flex justify-center items-center font-bold">
                {cartCount}
              </span>
              <div className="text-xs">Giỏ hàng</div>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="main-nav bg-[#333] text-white hidden lg:block">
        <div className="w-[90%] max-w-[1400px] mx-auto flex justify-start items-center">
          <ul className="nav-links flex">
            {/* Menu Item: Trang chủ */}
            <li className="relative group">
              <Link
                to="/"
                className="py-4 px-5 block uppercase font-bold text-sm transition-colors hover:bg-[#555]"
              >
                Trang chủ
              </Link>
            </li>

            {/* Menu Item: Giày bóng đá (Dropdown nhiều cột) */}
            <li className="relative group">
              <a
                href="#"
                className="py-4 px-5 block uppercase font-bold text-sm transition-colors hover:bg-[#555]"
              >
                Giày bóng đá <i className="fa fa-caret-down" />
              </a>
              <div className="dropdown-single-column hidden group-hover:block absolute top-full left-0 bg-[#333] text-white p-2.5 w-[280px] z-[1000]">
                <div className="dropdown-column w-full">
                  <ul>
                    <li>
                      <Link
                        to="/danh-muc/tat-ca"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        TẤT CẢ SẢN PHẨM
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/tat-ca"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        HÀNG MỚI VỀ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/giay-co-tu-nhien"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        GIÀY CỎ TỰ NHIÊN
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/giay-co-nhan-tao"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        GIÀY CỎ NHÂN TẠO
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/giay-futsal"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        GIÀY FUTSAL
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/giay-da-bong-gia-re"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        GIÀY ĐÁ BÓNG GIÁ RẺ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/giay-da-bong-tre-em"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        GIÀY ĐÁ BÓNG TRẺ EM
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/phien-ban-gioi-han"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        PHIÊN BẢN GIỚI HẠN
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/*THUONG HIEU*/}
            <li className="relative group">
              <a
                href="#"
                className="py-4 px-5 block uppercase font-bold text-sm transition-colors hover:bg-[#555]"
              >
                Thương hiệu <i className="fa fa-caret-down" />
              </a>
              <div className="dropdown-single-column hidden group-hover:block absolute top-full left-0 bg-[#333] text-white p-2.5 w-[280px] z-[1000]">
                <div className="dropdown-column w-full">
                  <ul>
                    {/* Item: NIKE */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/giay-da-banh-nike"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH NIKE
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/nike-mercurial"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Nike Mercurial
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/nike-phamtom"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Nike Phantom
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/nike-tiempo"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Nike Tiempo
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* Item: ADIDAS */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/giay-da-banh-adidas"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH ADIDAS
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/adidas-f50"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Adidas F50
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/adidas-x"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Adidas X
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/adidas-predator"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Adidas Predator
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/adidas-copa"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Adidas Copa
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Item: PUMA */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/giay-da-banh-puma"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH PUMA
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/puma-future"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Puma Future
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/puma-king"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Puma King
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/puma-ultra"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Puma Ultra
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Item: MIZUNO */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/giay-da-banh-mizuno"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH MIZUNO
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/mizuno-alpha"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Mizuno Alpha
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/mizuno-monarcida"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Mizuno Monarcida
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/mizuno-morelia"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Mizuno Morelia
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/mizuno-rebula"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Mizuno Rebula
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Item: ASICS */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/giay-da-banh-asic"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH ASICS
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/asics-calcetto"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Asics Calcetto
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/asics-destaque"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Asics Destaque
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/asics-toque"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Asics Toque
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/asics-ultrezza"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Asics Ultrezza
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Item: NMS */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/giay-da-banh-nms"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH NMS
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/nms-attack"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            NMS Attack
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/nms-capitan"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            NMS Capitan
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/nms-maestri"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            NMS Maestri
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/nms-spider"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            NMS Spider
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/nms-victory"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            NMS Victory
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Item: KAMITO */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/giay-da-banh-kamito"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH KAMITO
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/ta11"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            TA11
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/qh19"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            QH19
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/velocidad"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            Velocidad
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Item: ZOCKER */}
                    <li className="relative group/submenu">
                      <Link
                        to="/danh-muc/diay-da-banh-zocker"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555] after:content-['>'] after:font-bold"
                      >
                        GIÀY ĐÁ BANH ZOCKER
                      </Link>
                      <ul className="submenu hidden group-hover/submenu:block absolute left-full top-0 bg-[#333] min-w-[220px] p-2.5 shadow-lg rounded -mt-2.5">
                        <li>
                          <Link
                            to="/danh-muc/zoker-inspire"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            ZOCKER Inspire
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/danh-muc/zocker-space"
                            className="block py-2.5 px-3 font-normal normal-case hover:bg-[#555] after:content-['']"
                          >
                            ZOCKER Space
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Item: JOMA */}
                    <li>
                      <Link
                        to="/danh-muc/giay-da-banh-joma"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        GIÀY ĐÁ BANH JOMA
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* ===== KẾT THÚC PHẦN "THƯƠNG HIỆU" ===== */}
            {/* Menu Item: Phụ kiện */}
            <li className="relative group">
              <Link
                to="/danh-muc/phu-kien"
                className="py-4 px-5 block uppercase font-bold text-sm transition-colors hover:bg-[#555]"
              >
                Phụ kiện <i className="fa fa-caret-down" />
              </Link>
              <div className="dropdown-single-column hidden group-hover:block absolute top-full left-0 bg-[#333] text-white p-2.5 w-[280px] z-[1000]">
                <div className="dropdown-column w-full">
                  <ul>
                    <li>
                      <Link
                        to="/danh-muc/qua-bong-da"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        QUẢ BÓNG ĐÁ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/boc-ong-dong"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        BỌC ỐNG ĐỒNG
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/gang-tay-thu-mon"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        GĂNG TAY THỦ MÔN
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/vo-bong-da"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        VỚ BÓNG ĐÁ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/ao-bong-da-chinh-hang"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        ÁO BÓNG ĐÁ CHÍNH HÃNG
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/phu-kien-ra-san"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        PHỤ KIỆN RA SÂN
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/balo-tui-xach"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        BALO TÚI XÁCH
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/bo-quan-ao-bong-da"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        BỘ QUẦN ÁO BÓNG ĐÁ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/danh-muc/dep-chinh-hang"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        DÉP CHÍNH HÃNG
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Menu Item: Dịch vụ */}
            <li className="relative group">
              <a className="py-4 px-5 block uppercase font-bold text-sm transition-colors hover:bg-[#555]">
                Dịch vụ <i className="fa fa-caret-down" />
              </a>
              {/* Tăng width cho vừa chữ */}
              <div className="dropdown-single-column hidden group-hover:block absolute top-full left-0 bg-[#333] text-white p-2.5 w-[350px] z-[1000]">
                <div className="dropdown-column w-full">
                  <ul>
                    <li>
                      <Link
                        to="/dich-vu/sua-chua-giay"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        SỬA CHỮA GIÀY BÓNG ĐÁ CHÍNH HÃNG
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Menu Item: Hướng dẫn */}
            <li className="relative group">
              <a
                href="#"
                className="py-4 px-5 block uppercase font-bold text-sm transition-colors hover:bg-[#555]"
              >
                Hướng dẫn <i className="fa fa-caret-down" />
              </a>
              {/* Tăng width cho vừa chữ */}
              <div className="dropdown-single-column hidden group-hover:block absolute top-full left-0 bg-[#333] text-white p-2.5 w-[350px] z-[1000]">
                <div className="dropdown-column w-full">
                  <ul>
                    <li>
                      <Link
                        to="/huong-dan/chon-size-giay"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        CÁCH CHỌN SIZE
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/huong-dan/chinh-sach-van-chuyen"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        CHÍNH SÁCH VẬN CHUYỂN VÀ GIAO NHẬN
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/huong-dan/chinh-sach-kiem-hang"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        CHÍNH SÁCH KIỂM HÀNG
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/huong-dan/chinh-sach-bao-hanh"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        CHÍNH SÁCH BẢO HÀNH
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/huong-dan/quy-dinh-doi-hang"
                        className="flex justify-between items-center py-2.5 px-3 font-bold text-[#f0f0f0] transition-colors hover:bg-[#555]"
                      >
                        QUY ĐỊNH ĐỔI HÀNG
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
