// src/pages/HomePage.jsx (Đã sửa đổi)
import React, { useState, useEffect, useCallback } from "react";
import Slider from "../components/Slider";
import Section from "../components/Section";
import CategoryCard from "../components/CategoryCard";
import BrandCard from "../components/BrandCard";
import PositionCard from "../components/PositionCard";
import { Link } from "react-router-dom";
import { fetchApi } from "../utils/api"; // THÊM: Import fetchApi

// Dữ liệu tĩnh cho Banner (giữ lại vì không có API trả về URL ảnh banner)
const categoriesStatic = [
  {
    size: "large",
    img: "https://theme.hstatic.net/1000061481/1001035882/14/index_banner_1.jpg?v=2391",
    title: "GIÀY CỎ NHÂN TẠO (SÂN CỎ TF)",
    desc: "Hơn 1000+ mẫu giày cho sân cỏ nhân tạo",
    linkUrl: "/danh-muc/giay-co-nhan-tao",
  },
  {
    size: "large",
    img: "https://theme.hstatic.net/1000061481/1001035882/14/index_banner_2.jpg?v=2391",
    title: "GIÀY CỎ TỰ NHIÊN (SÂN FG, AG, SG)",
    desc: "Giày cho sân chuyên nghiệp",
    linkUrl: "/danh-muc/giay-co-tu-nhien",
  },
  {
    size: "large",
    img: "https://theme.hstatic.net/1000061481/1001035882/14/index_banner_3.jpg?v=2391",
    title: "GIÀY FUTSAL (SÂN IC)",
    desc: "Đa dạng mẫu mã cho sân trong nhà",
    linkUrl: "/danh-muc/giay-futsal",
  },
  {
    size: "large",
    img: "https://theme.hstatic.net/1000061481/1001035882/14/index_banner_4.jpg?v=2391",
    title: "GIÀY ĐÁ BÓNG THƯƠNG HIỆU VIỆT",
    desc: "Chất lượng cao, giá hợp lý",
    linkUrl: "/danh-muc/giay-da-bong-gia-re",
  },
];

// Ánh xạ tên thương hiệu với ảnh tĩnh (Backend không có trường logo)
const BRAND_IMAGE_MAPPING = {
  Nike: "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_1.jpg?v=2391",
  Adidas:
    "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_2.jpg?v=2391",
  Puma: "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_3.jpg?v=2391",
  Mizuno:
    "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_4.jpg?v=2391",
  Joma: "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_5.jpg?v=2391",
  Asics:
    "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_6.jpg?v=2391",
  NMS: "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_7.jpg?v=2391",
  KAMITO:
    "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_8.jpg?v=2391",
  ZOCKER:
    "https://theme.hstatic.net/1000061481/1001035882/14/brand_banner_9.jpg?v=2391",
};

// Dữ liệu Vị trí (Giữ nguyên vì Backend không có API tương ứng)
const positions = [
  {
    img: "https://theme.hstatic.net/1000061481/1001035882/14/position_banner_1.jpg?v=2391",
    title: "HẬU VỆ",
    desc: "Dòng giày cho các chiến binh",
    linkUrl: "/danh-muc/giay-da-bong-danh-cho-hau-ve",
  },
  {
    img: "https://theme.hstatic.net/1000061481/1001035882/14/position_banner_2.jpg?v=2391",
    title: "TIỀN VỆ TRUNG TÂM",
    desc: "Kiểm soát và điều tiết trận đấu",
    linkUrl: "/danh-muc/giay-da-bong-danh-cho-tien-ve-trung-tam",
  },
  {
    img: "https://theme.hstatic.net/1000061481/1001035882/14/position_banner_3.jpg?v=2391",
    title: "TIỀN VỆ CÁNH",
    desc: "Tốc độ và sự đột phá",
    linkUrl: "/danh-muc/giay-da-bong-danh-cho-tien-ve-canh",
  },
  {
    img: "https://theme.hstatic.net/1000061481/1001035882/14/position_banner_4.jpg?v=2391",
    title: "TIỀN ĐẠO",
    desc: "Dòng giày cho các sát thủ vòng cấm",
    linkUrl: "/danh-muc/giay-da-bong-danh-cho-tien-dao",
  },
];

export default function HomePage() {
  const [dynamicBrands, setDynamicBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm Fetch Brands từ Backend
  const fetchBrands = useCallback(async () => {
    try {
      // Endpoint: GET /brands
      const response = await fetchApi("/brands");
      const fetchedBrands = response?.data || response || [];

      // Ánh xạ dữ liệu từ API về cấu trúc cần cho BrandCard
      const mappedBrands = fetchedBrands.map((b) => ({
        // Tên thương hiệu cho alt tag
        alt: b.name,
        // Link URL dựa trên slug của thương hiệu - đến trang sản phẩm lọc theo brand
        linkUrl: `/san-pham?brand=${b.slug}`,
        // Dùng ảnh tĩnh được ánh xạ theo tên
        imageUrl:
          BRAND_IMAGE_MAPPING[b.name] || "https://via.placeholder.com/300",
        // Lưu thêm brand ID để có thể dùng sau này
        brandId: b._id,
        brandSlug: b.slug,
      }));

      setDynamicBrands(mappedBrands);
    } catch (error) {
      console.error("Lỗi khi tải thương hiệu:", error);
      setDynamicBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <>
      <Slider />
      <div className="container page-content w-[90%] max-w-[1000px] mx-auto mt-10">
        {/* PHẦN DANH MỤC (Vẫn dùng dữ liệu tĩnh) */}
        <Section title="BẠN ĐANG TÌM">
          <div className="category-grid grid grid-cols-1 md:grid-cols-12 gap-5">
            {categoriesStatic.map((cat, index) => (
              <CategoryCard
                key={index}
                size={cat.size}
                imageUrl={cat.img}
                title={cat.title}
                description={cat.desc}
                alt={cat.alt}
                linkUrl={cat.linkUrl}
                gridClass="col-span-1 md:col-span-3"
              />
            ))}
            {/* Các banner nhỏ tĩnh */}
            <Link
              to="/danh-muc/giay-da-bong-tre-em"
              id="small-card-kids"
              className="col-span-1 md:col-span-4 group"
            >
              <div className="category-card small block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                <img
                  src="https://theme.hstatic.net/1000061481/1001035882/14/index_banner_5.jpg?v=2391"
                  alt="For Kids"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h4 className="category-card-caption caption-red text-sm uppercase font-bold mt-2.5 text-center px-2.5 text-gray-800 transition-colors group-hover:text-green-800">
                GIÀY ĐÁ BANH TRẺ EM
              </h4>
            </Link>
            <Link
              to="/danh-muc/ao-bong-da-chinh-hang"
              id="small-card-shirts"
              className="col-span-1 md:col-span-4 group"
            >
              <div className="category-card small block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                <img
                  src="https://theme.hstatic.net/1000061481/1001035882/14/index_banner_6.jpg?v=2391"
                  alt="Áo Bóng Đá"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h4 className="category-card-caption caption-green text-sm uppercase font-bold mt-2.5 text-center px-2.5 text-gray-800 transition-colors group-hover:text-green-800">
                ÁO BÓNG ĐÁ CHÍNH HÃNG
              </h4>
            </Link>
            <Link
              to="/danh-muc/qua-bong-da"
              id="small-card-ball"
              className="col-span-1 md:col-span-4 group"
            >
              <div className="category-card small block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                <img
                  src="https://theme.hstatic.net/1000061481/1001035882/14/index_banner_7.jpg?v=2391"
                  alt="Quả Bóng Đá"
                  className="w-full h-auto object-cover"
                />
              </div>
              <h4 className="category-card-caption caption-green text-sm uppercase font-bold mt-2.5 text-center px-2.5 text-gray-800 transition-colors group-hover:text-green-800">
                QUẢ BÓNG ĐÁ
              </h4>
            </Link>
          </div>
        </Section>

        {/* PHẦN THƯƠNG HIỆU (ĐÃ DÙNG DỮ LIỆU ĐỘNG) */}
        <Section title="THƯƠNG HIỆU">
          {loading ? (
            <p className="text-center text-gray-600">
              Đang tải danh sách thương hiệu...
            </p>
          ) : (
            <div className="brand-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dynamicBrands.map((brand, index) => (
                <BrandCard
                  key={index}
                  imageUrl={brand.imageUrl}
                  alt={brand.alt}
                  linkUrl={brand.linkUrl}
                />
              ))}
            </div>
          )}
        </Section>

        {/* PHẦN VỊ TRÍ (Vẫn dùng dữ liệu tĩnh) */}
        <Section title="CHỌN GIÀY THEO VỊ TRÍ">
          <div className="position-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {positions.map((pos, index) => (
              <PositionCard
                key={index}
                imageUrl={pos.img}
                title={pos.title}
                description={pos.desc}
                linkUrl={pos.linkUrl}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
