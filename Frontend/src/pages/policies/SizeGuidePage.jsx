// src/pages/general/SizeGuidePage.jsx
import React from "react";

export default function SizeGuidePage() {
  return (
    <div className="container w-[90%] max-w-[800px] mx-auto mt-10 py-10">
      {/* Tiêu đề trang */}
      <h1 className="text-3xl font-bold text-center mb-8 uppercase text-gray-800 border-b-2 border-primary pb-4 inline-block mx-auto w-full">
        HƯỚNG DẪN CHỌN SIZE GIÀY ĐÁ BANH CHÍNH HÃNG
      </h1>

      {/* Nội dung chính (Dùng class 'prose' để format đẹp tự động) */}
      <div className="prose max-w-none bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        {/* PHẦN 1: HƯỚNG DẪN ĐO CHÂN */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center uppercase text-primary">
            1. Quy trình đo size chân chuẩn xác
          </h2>
          <p className="mb-4">
            Việc chọn đúng size giày là yếu tố quan trọng nhất để đảm bảo cảm
            giác bóng tốt nhất và tránh chấn thương. Dưới đây là hướng dẫn chi
            tiết cách đo chân.
          </p>

          <figure>
            <img
              src="https://file.hstatic.net/1000061481/file/bang_lay_so_do_chan-01_cc3a53502a864c648f1bb1db34dc2a96_1024x1024.jpg"
              alt="Hướng dẫn đo size chân"
              className="w-full h-auto rounded-lg shadow-md my-4 border border-gray-200"
            />
            <figcaption className="text-center text-sm text-gray-500 italic">
              Hình 1: Các bước đo chiều dài và chiều rộng bàn chân
            </figcaption>
          </figure>

          <div className="bg-yellow-50 p-4 border-l-4 border-yellow-400 my-6">
            <h4 className="font-bold text-yellow-800 mb-2">
              LƯU Ý: CHÚ Ý ĐẾN FORM CHÂN (THON / BÈ)
            </h4>
            <p className="text-sm text-yellow-700 mb-2">
              - <strong>Chân thon:</strong> Dễ chọn giày, chỉ cần căn cứ vào
              chiều dài. Phù hợp: Nike Mercurial, Adidas X...
            </p>
            <p className="text-sm text-yellow-700">
              - <strong>Chân bè:</strong> Cần chú ý đến độ rộng. Nên chọn các
              dòng thoải mái như: Nike Tiempo, Adidas Copa, Puma Future,
              Mizuno...
            </p>
          </div>
        </div>

        {/* PHẦN 2: BẢNG SIZE CÁC HÃNG */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center uppercase text-primary border-t pt-8">
            2. Bảng quy đổi Size theo Thương hiệu
          </h2>

          <div className="space-y-12">
            {/* NIKE */}
            <div className="brand-size-chart">
              <h3 className="text-xl font-bold mb-3 text-gray-800 border-l-4 border-black pl-3">
                Bảng size giày NIKE
              </h3>
              <img
                src="https://file.hstatic.net/1000061481/file/bang_tinh_size_giay_nike-01_04e8dc7953e1405d987f06e46c70ba81_116e6ba1a9344c1ead46290aeffcc961_1024x1024.jpg" // <-- Dán link ảnh Nike vào đây
                alt="Bảng size Nike"
                className="w-full h-auto rounded shadow-sm border"
              />
            </div>

            {/* ADIDAS */}
            <div className="brand-size-chart">
              <h3 className="text-xl font-bold mb-3 text-gray-800 border-l-4 border-black pl-3">
                Bảng size giày ADIDAS
              </h3>
              <img
                src="https://file.hstatic.net/1000061481/file/bang_tinh_size_giay_adidas-01_5b67a17c1c4444c38cdaddc22fc13d4c_91f2600187864925a06fc00f939aecf1_1024x1024.jpg" // <-- Dán link ảnh Adidas vào đây
                alt="Bảng size Adidas"
                className="w-full h-auto rounded shadow-sm border"
              />
            </div>

            {/* PUMA */}
            <div className="brand-size-chart">
              <h3 className="text-xl font-bold mb-3 text-gray-800 border-l-4 border-black pl-3">
                Bảng size giày PUMA
              </h3>
              <img
                src="https://file.hstatic.net/1000061481/file/bang_tinh_size_giay_puma-01__1__3e4f27ff93a94fd48d9411106883be09_f29b800834814339bc70a78ae066b06c_1024x1024.jpg" // <-- Dán link ảnh Puma vào đây
                alt="Bảng size Puma"
                className="w-full h-auto rounded shadow-sm border"
              />
            </div>

            {/* MIZUNO */}
            <div className="brand-size-chart">
              <h3 className="text-xl font-bold mb-3 text-gray-800 border-l-4 border-black pl-3">
                Bảng size giày MIZUNO
              </h3>
              <img
                src="https://file.hstatic.net/1000061481/file/bang_tinh_size_giay_mizuno-01__1__7978625c62ae4dc3bede2a1f21c8b0d6_f4c75cada70443288aee8744a053def6_1024x1024.jpg" // <-- Dán link ảnh Mizuno vào đây
                alt="Bảng size Mizuno"
                className="w-full h-auto rounded shadow-sm border"
              />
            </div>

            {/* ASICS */}
            <div className="brand-size-chart">
              <h3 className="text-xl font-bold mb-3 text-gray-800 border-l-4 border-black pl-3">
                Bảng size giày ASICS
              </h3>
              <img
                src="https://file.hstatic.net/1000061481/file/ang_tinh_size_giay_asics-01_3d886e90dae04e84866af7e9164cd0b1_2048x2048_d0825ea1b4cb4f3fb0bc13885e80c841_1024x1024.jpg" // <-- Dán link ảnh Asics vào đây
                alt="Bảng size Asics"
                className="w-full h-auto rounded shadow-sm border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
