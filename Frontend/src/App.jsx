// src/App.jsx (Đã sửa hoàn chỉnh)
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import SocialIcons from "./components/SocialIcons";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OrderLookupPage from "./pages/OrderLookupPage";
import AccountPage from "./pages/AccountPage";
import SearchPage from "./pages/SearchPage";
import BrandProductsPage from "./pages/BrandProductsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RepairService from "./pages/policies/RepairService";
import SizeGuidePage from "./pages/policies/SizeGuidePage";
import ShippingPolicyPage from "./pages/policies/ShippingPolicyPage";
import InspectionPolicyPage from "./pages/policies/InspectionPolicyPage";
import ReturnPolicyPage from "./pages/policies/ReturnPolicyPage";
import WarrantyPolicyPage from "./pages/policies/WarrantyPolicyPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminCategoriesBrandsPage from "./pages/admin/AdminCategoriesBrandsPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminPromotionsPage from "./pages/admin/AdminPromotionsPage";
import AdminNewsPage from "./pages/admin/AdminNewsPage";
import AdminFloatingButton from "./components/AdminFloatingButton";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <main>
        <Routes>
          {/* 1. CÁC ROUTE CHÍNH CỦA NGƯỜI DÙNG */}
          <Route path="/" element={<HomePage />} />

          <Route path="/danh-muc/:categoryId" element={<ProductListPage />} />
          <Route path="/san-pham" element={<ProductListPage />} />

          <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/thanh-toan" element={<CheckoutPage />} />

          <Route
            path="/dat-hang-thanh-cong"
            element={<OrderConfirmationPage />}
          />
          <Route path="/dang-ky" element={<RegisterPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />

          <Route path="/tra-cuu-don-hang" element={<OrderLookupPage />} />
          <Route path="/tai-khoan" element={<AccountPage />} />
          <Route path="/tim-kiem" element={<SearchPage />} />
          <Route path="/hang/:brandSlug" element={<BrandProductsPage />} />

          <Route path="/dich-vu/sua-chua-giay" element={<RepairService />} />

          <Route path="/huong-dan/chon-size-giay" element={<SizeGuidePage />} />

          <Route
            path="/huong-dan/chinh-sach-van-chuyen"
            element={<ShippingPolicyPage />}
          />
          <Route
            path="/huong-dan/chinh-sach-kiem-hang"
            element={<InspectionPolicyPage />}
          />
          <Route
            path="/huong-dan/quy-dinh-doi-hang"
            element={<ReturnPolicyPage />}
          />
          <Route
            path="/huong-dan/chinh-sach-bao-hanh"
            element={<WarrantyPolicyPage />}
          />
          {/* 2. CÁC ROUTE ADMIN (LỒNG NHAU BÊN TRONG ROUTE CHỦ) */}
          <Route
            path="/admin"
            element={<AdminRoute element={<AdminLayout />} />}
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesBrandsPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="promotions" element={<AdminPromotionsPage />} />
            <Route path="news" element={<AdminNewsPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <SocialIcons />
      <AdminFloatingButton />
    </>
  );
}

export default App;
