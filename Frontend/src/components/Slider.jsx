import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Dữ liệu slide (từ index.html)
const slideImages = [
  {
    img: "https://theme.hstatic.net/1000061481/1001035882/14/slideshow_1.jpg?v=2391",
    alt: "Adidas F50 Banner",
  },
  {
    img: "https://theme.hstatic.net/1000061481/1001035882/14/slideshow_2.jpg?v=2391",
    alt: "Nike Banner",
  },
  {
    img: "https://file.hstatic.net/1000061481/collection/logo_brand2-03_40cd51b4571841e0947cfbfb49279f02.jpg",
    alt: "Puma Banner",
  },
];

export default function Slider() {
  return (
    /* .slider { ... max-height: 600px; overflow: hidden; position: relative; }
      Dịch -> w-full max-h-[600px] overflow-hidden relative
    */
    <section className="slider w-full max-h-[600px] overflow-hidden relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true} // Bật nút < >
        pagination={{ clickable: true }} // Bật dấu chấm
        autoplay={{
          delay: 5000, // 5 giây
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {slideImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.img}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
