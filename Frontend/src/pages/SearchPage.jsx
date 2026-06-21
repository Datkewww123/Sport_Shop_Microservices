// src/pages/SearchPage.jsx (Đã sửa đổi)
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
// import { allProductsData } from "../data/products.js"; // XÓA: Lỗi xảy ra ở đây
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { fetchApi, buildQueryParams } from "../utils/api"; // THÊM: Import fetchApi và buildQueryParams
import { toast } from "react-toastify"; // THÊM: Để hiển thị lỗi
import { SkeletonCard } from "../components/LoadingSkeleton";

const PRODUCTS_PER_PAGE = 12; // Dùng 12 để đồng bộ với Backend

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState({
    products: [],
    totalPages: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  // 1. HÀM GỌI API TÌM KIẾM
  const fetchSearchResults = useCallback(async () => {
    if (!query) {
      setSearchResults({ products: [], totalPages: 0, total: 0 });
      return;
    }
    setLoading(true);

    // Xây dựng Query Params cho API Backend
    const params = {
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
      q: query, // Sử dụng tham số 'q' của endpoint /search
    };

    const queryString = buildQueryParams(params);

    try {
      const response = await fetchApi(`/products/search?${queryString}`);

      // Ánh xạ dữ liệu từ Backend về cấu trúc cần thiết cho Frontend
      // ResponseHelper trả về {success, data, pagination}
      const products = response.data.map((p) => ({
        id: p._id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        stock: p.stock || 0,
        sold: p.sold || 0,
        description: p.description,
        brand: p.brand?.name,
        imageUrl:
          p.images?.length > 0
            ? p.images[0]
            : "https://placehold.co/300x300?text=No+Image",
      }));

      setSearchResults({
        products: products,
        totalPages: response.pagination.totalPages,
        total: response.pagination.total,
      });
    } catch (error) {
      console.error("Lỗi khi tải kết quả tìm kiếm:", error);
      toast.error("Lỗi khi tải kết quả tìm kiếm.");
      setSearchResults({ products: [], totalPages: 0, total: 0 });
    } finally {
      setLoading(false);
    }
  }, [query, currentPage]);

  // 2. Chạy hàm tìm kiếm khi query hoặc trang thay đổi
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  // Xử lý khi đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="container w-[90%] max-w-[1200px] mx-auto mt-10 py-10">
        <h1 className="text-3xl font-bold text-center mb-4">
          Đang tìm kiếm: "{query}"
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  const { products, totalPages, total } = searchResults;

  return (
    <div className="container w-[90%] max-w-[1200px] mx-auto mt-10 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">
        Kết quả tìm kiếm cho: "{query}"
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Tìm thấy {total} sản phẩm.
      </p>

      {total > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <i className="fas fa-search text-6xl text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            {!query
              ? "Vui lòng nhập từ khóa tìm kiếm"
              : `Không tìm thấy kết quả cho "${query}"`}
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {!query
              ? "Nhập từ khóa vào ô tìm kiếm phía trên để bắt đầu."
              : "Thử tìm kiếm với từ khóa khác hoặc khám phá sản phẩm của chúng tôi"}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/san-pham"
              className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Xem tất cả sản phẩm
            </Link>
            <Link
              to="/"
              className="border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              Về trang chủ
            </Link>
          </div>
          {query && (
            <p className="text-sm text-gray-400 mt-8">
              Gợi ý: Nike, Adidas, Puma, Futsal, Cỏ nhân tạo
            </p>
          )}
        </div>
      )}
    </div>
  );
}
