// src/pages/SearchPage.jsx (Đã sửa đổi)
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
// import { allProductsData } from "../data/products.js"; // XÓA: Lỗi xảy ra ở đây
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { fetchApi, buildQueryParams } from "../utils/api"; // THÊM: Import fetchApi và buildQueryParams
import { toast } from "react-toastify"; // THÊM: Để hiển thị lỗi

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
            : "https://via.placeholder.com/300",
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
      <div className="text-center py-20 text-xl">Đang tìm kiếm sản phẩm...</div>
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
        <p className="text-center text-xl">
          {!query
            ? "Vui lòng nhập từ khóa để tìm kiếm."
            : "Không tìm thấy sản phẩm nào phù hợp."}
        </p>
      )}
    </div>
  );
}
