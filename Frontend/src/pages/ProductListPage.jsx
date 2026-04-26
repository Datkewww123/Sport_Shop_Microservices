// src/pages/ProductListPage.jsx (Đã sửa đổi)
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
// import { allProductsData } from "../data/products.js"; // ĐÃ BỎ: Không dùng mock data
import ProductSidebar from "../components/ProductSidebar.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import { fetchApi, buildQueryParams } from "../utils/api"; // THÊM buildQueryParams
import { ProductGridSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage, { EmptyState } from "../components/ErrorMessage";

// Cài đặt số lượng sản phẩm mỗi trang
const PRODUCTS_PER_PAGE = 12; // Đã đổi từ 18 sang 12 để phù hợp với mặc định Backend

// Hàm ánh xạ tên sắp xếp Frontend sang trường sort của Backend
const SORT_MAPPING = {
  "Sản phẩm nổi bật": "-createdAt",
  "Giá: Tăng dần": "price",
  "Giá: Giảm dần": "-price",
  "Tên: A-Z": "name",
  "Tên: Z-A": "-name",
  "Mới nhất": "-createdAt", // Backend dùng -createdAt
  "Cũ nhất": "createdAt",
};

// Hàm trợ giúp để chuyển khoảng giá sang min/maxPrice (Dùng trên Frontend)
function getPriceQuery(activePriceFilters) {
  let minPrice, maxPrice;
  // Logic đơn giản: chỉ lấy min/max từ filter đầu tiên được chọn
  const range = activePriceFilters[0];

  if (range === "Dưới 1,000,000₫") maxPrice = 1000000;
  if (range === "1,000,000₫ - 2,000,000₫") {
    minPrice = 1000000;
    maxPrice = 2000000;
  }
  if (range === "2,000,000₫ - 3,000,000₫") {
    minPrice = 2000000;
    maxPrice = 3000000;
  }
  if (range === "3,000,000₫ - 4,000,000₫") {
    minPrice = 3000000;
    maxPrice = 4000000;
  }
  if (range === "Trên 4,000,000₫") minPrice = 4000000;

  return { minPrice, maxPrice };
}

export default function ProductListPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const brandFromUrl = searchParams.get("brand"); // Lấy brand từ query params
  
  const [sortOrder, setSortOrder] = useState("Sản phẩm nổi bật");

  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    prices: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState({
    products: [],
    totalPages: 1,
    total: 0,
    categoryName: "Đang tải...",
    categoryObject: null, // Lưu trữ object category/brand để dùng ID
  });
  const [loading, setLoading] = useState(true);

  // 1. Fetch Categories/Brands để lấy ID (Frontend dùng Slug, Backend dùng ID)
  const fetchCategoryData = useCallback(async () => {
    try {
      if (!categoryId || categoryId === "tat-ca") {
        return { categoryId: null, pageTitle: "Tất Cả Sản Phẩm" };
      }

      // Gọi API để lấy category by slug
      const response = await fetchApi(`/categories/slug/${categoryId}`);
      const category = response.data || response; // Backend trả về {success, data: category}
      return {
        categoryId: category._id,
        pageTitle: category.name || "Danh Mục Sản Phẩm",
        categoryObject: category
      };
    } catch (e) {
      console.warn(`Không tìm thấy category: ${categoryId}`, e);
      return { categoryId: null, pageTitle: categoryId.toUpperCase().replace(/-/g, " ") };
    }
  }, [categoryId]);

  // 2. HÀM GỌI API CHÍNH
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const categoryInfo = await fetchCategoryData();

    // Ánh xạ filter giá sang minPrice, maxPrice
    const { minPrice, maxPrice } = getPriceQuery(activeFilters.prices);

    // Xử lý brand: Ưu tiên brand từ URL, sau đó mới đến filter
    let brandFilter = activeFilters.brands;
    if (brandFromUrl && !activeFilters.brands.includes(brandFromUrl)) {
      brandFilter = [brandFromUrl, ...activeFilters.brands];
    }

    // Xây dựng Query Params
    const params = {
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
      category: categoryInfo.categoryId || undefined, // Truyền category ID nếu có
      brand: brandFilter.length > 0 ? brandFilter : undefined, // Backend có thể nhận mảng
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      sort: SORT_MAPPING[sortOrder] || SORT_MAPPING["Sản phẩm nổi bật"],
      // search: // Thêm search query nếu có
    };

    const queryString = buildQueryParams(params);

    try {
      const response = await fetchApi(`/products?${queryString}`);

      console.log("=== DEBUG ProductListPage ===");
      console.log("Response:", response);
      console.log("Response.data:", response.data);
      console.log("Response.pagination:", response.pagination);

      // Backend trả về: {success, statusCode, message, data: [...], pagination: {...}}
      const productsData = response.data || [];
      const paginationData = response.pagination || { totalPages: 1, total: 0 };

      console.log("Products Data:", productsData);
      console.log("Pagination Data:", paginationData);

      // Chuyển đổi dữ liệu từ Backend sang Frontend format
      const products = productsData.map((p) => ({
        id: p._id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        brand: p.brand?.name,
        stock: p.stock || 0,
        sold: p.sold || 0,
        description: p.description,
        imageUrl:
          p.images?.length > 0
            ? p.images[0]
            : "https://via.placeholder.com/300",
      }));

      console.log("Mapped Products:", products);
      console.log("Products Count:", products.length);

      // Xác định tên trang hiển thị
      let pageTitle = categoryInfo.pageTitle;
      if (brandFromUrl) {
        // Nếu lọc theo brand, hiển thị tên brand
        pageTitle = `Sản phẩm ${brandFromUrl.toUpperCase().replace(/-/g, " ")}`;
      }

      setProductsData({
        products: products,
        totalPages: paginationData.totalPages,
        total: paginationData.total,
        categoryName: pageTitle,
        categoryObject: categoryInfo.categoryObject,
      });
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      setProductsData((prev) => ({
        ...prev,
        products: [],
        totalPages: 1,
        total: 0,
      }));
    } finally {
      setLoading(false);
    }
  }, [categoryId, currentPage, sortOrder, activeFilters, fetchCategoryData, brandFromUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 3. Hàm xử lý khi filter thay đổi (Giữ nguyên logic reset về trang 1)
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prevFilters) => {
      const currentFilterValues = prevFilters[filterType];
      let newFilterValues;
      if (currentFilterValues.includes(value)) {
        newFilterValues = currentFilterValues.filter((item) => item !== value);
      } else {
        newFilterValues = [...currentFilterValues, value];
      }
      return {
        ...prevFilters,
        [filterType]: newFilterValues,
      };
    });
    // Reset về trang 1 khi lọc
    setCurrentPage(1);
  };

  // Xử lý khi Product List đang tải
  if (loading) {
    return (
      <div className="container-custom mt-10">
        <h1 className="text-2xl font-bold mb-6 animate-pulse text-gray-700">
          {productsData.categoryName || "Đang tải..."}
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <ProductGridSkeleton count={12} />
          </main>
        </div>
      </div>
    );
  }

  // Nếu không tìm thấy danh mục (khi categoryId là tên không hợp lệ)
  if (productsData.categoryName === "Không tìm thấy danh mục") {
    return (
      <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-20 text-center">
        <h1 className="text-3xl font-bold">404 - Không tìm thấy danh mục</h1>
        <Link
          to="/"
          className="text-lg text-primary hover:underline mt-4 block"
        >
          Quay về Trang chủ
        </Link>
      </div>
    );
  }

  // (Phần render đã cập nhật)
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container w-[90%] max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {productsData.categoryName}
        </h1>
        <p className="text-gray-600 mb-8">{productsData.total} sản phẩm</p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Cột Trái (Sidebar) - Fixed width */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <ProductSidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Cột Phải (Nội dung chính) */}
          <div>
            <ProductGrid
              products={productsData.products}
              sortOrder={sortOrder}
              setSortOrder={(value) => {
                setSortOrder(value);
                setCurrentPage(1); // Reset về trang 1 khi sắp xếp
              }}
            />

            {productsData.total > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={productsData.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
            {productsData.total === 0 && (
              <p className="text-center text-xl py-10">
                Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
