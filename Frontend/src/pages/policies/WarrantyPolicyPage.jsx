// src/pages/general/WarrantyPolicyPage.jsx
import React from "react";

export default function WarrantyPolicyPage() {
  return (
    <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-10">
      {/* Tiêu đề chính */}
      <h1 className="text-3xl font-bold text-center mb-8 uppercase text-gray-800 border-b-2 border-gray-200 pb-4">
        CHÍNH SÁCH BẢO HÀNH
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-gray-700 leading-relaxed text-sm md:text-base">
        {/* PHẦN A: GIÀY BÓNG ĐÁ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-red-600 uppercase mb-4">
            A. ĐỐI VỚI CÁC SẢN PHẨM GIÀY BÓNG ĐÁ CHÍNH HÃNG:
          </h2>
          <p className="mb-4 text-gray-700">
            Bóng đá là môn thể thao đối kháng, những va chạm, những trầy xước,
            hư hao là không thể tránh khỏi. Tất cả sản phẩm Giày bóng đá Chính
            Hãng mua tại hệ thống THSPORT đều được hỗ trợ bảo hành xuyên suốt
            thời gian sử dụng.
          </p>
          <ul className="bg-yellow-50 p-4 border-l-4 border-yellow-400 text-sm text-gray-700 mb-6 space-y-1 list-none">
            <li>
              - Khách hàng sẽ được lưu thông tin bảo hành Online qua SĐT mua
              hàng.
            </li>
            <li>
              - Thời gian xử lý bảo hành: <strong>1-10 ngày</strong> tuỳ tình
              trạng hư hỏng.
            </li>
            <li>
              - Thời gian bảo hành:{" "}
              <span className="bg-yellow-200 font-bold px-1">180 ngày</span> căn
              cứ vào ngày mua hàng.
            </li>
            <li>
              - Hotline hỗ trợ bảo hành: <strong>0789.970.907</strong>
            </li>
          </ul>

          {/* Banner Bảo hành */}
          <img
            src="https://file.hstatic.net/1000061481/file/chinh_sach_bao_hanh_neymarsport_e0a7a5a3a7a34a4a8a8a_master.jpg"
            alt="Banner bảo hành 180 ngày"
            className="w-full h-auto rounded mb-6"
          />

          <h3 className="font-bold text-gray-800 mb-2">
            1. CÁC TRƯỜNG HỢP ĐƯỢC BẢO HÀNH:
          </h3>
          <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
            <li>Hở keo ép mũi giày, thân giày do ma sát với mặt cỏ.</li>
            <li>
              Các vết rách, lủng da do va chạm hoặc vật sắc nhọn đâm thủng.
            </li>
            <li>Các lỗi nhỏ ít gặp khác: Rách cổ thun, hỏng đệm mút gót...</li>
          </ul>

          <h3 className="font-bold text-gray-800 mb-2">
            2. CÁC TRƯỜNG HỢP KHÔNG BẢO HÀNH ĐƯỢC:
          </h3>
          <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
            <li>
              GÃY ĐINH, NỨT ĐẾ HOẶC BỂ ĐẾ khi thi đấu trên mặt sân cứng hoặc
              tiếp xúc vật nóng.
            </li>
            <li>
              ĐẶC BIỆT ĐỐI VỚI CÁC VẤN ĐỀ LIÊN QUAN ĐẾN THẨM MỸ (trầy xước da,
              Nổ da, Bong tróc logo, phai màu...).
            </li>
            <li className="text-red-600 italic">
              Lưu ý: Các trường hợp Khách hàng tự ý sửa chữa hoặc giày bị động
              vật cắn làm hư hỏng kết cấu giày THSPORT có thể từ chối bảo hành.
            </li>
          </ul>

          {/* Bảng giá sửa chữa */}
          <div className="my-8">
            <h3 className="text-center font-bold text-xl mb-4 text-primary uppercase">
              Bảng giá sửa chữa (Tham khảo)
            </h3>
            <img
              src="LINK_ANH_BANG_GIA_SUA_CHUA" // Thay link ảnh của bạn vào đây
              alt="Bảng giá sửa chữa"
              className="w-full h-auto rounded border"
            />
          </div>

          {/* Hướng dẫn vệ sinh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <img
              src="LINK_ANH_HUONG_DAN_VE_SINH" // Thay link ảnh của bạn vào đây
              alt="Hướng dẫn vệ sinh"
              className="w-full h-auto border"
            />
            <img
              src="LINK_ANH_HUONG_DAN_BAO_QUAN" // Thay link ảnh của bạn vào đây
              alt="Hướng dẫn bảo quản"
              className="w-full h-auto border"
            />
          </div>
        </div>

        {/* PHẦN B: BÓNG CHÍNH HÃNG */}
        <div className="mb-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-red-600 uppercase mb-4">
            B. ĐỐI VỚI CÁC SẢN PHẨM BÓNG CHÍNH HÃNG:
          </h2>
          <p className="mb-2 text-gray-700">
            Các sản phẩm bóng chính hãng NIKE, ADIDAS, MOLTEN sẽ áp dụng chính
            sách bảo hành như sau:
          </p>

          <h3 className="font-bold text-gray-800 mb-2 mt-4 text-red-500">
            - CÁC LỖI ĐƯỢC BẢO HÀNH:
          </h3>
          <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
            <li>
              Bảo hành 1 đổi 1 trong 7 ngày đầu tính từ ngày mua hàng với các
              lỗi (do nhà sản xuất) như: Thụt van, van bơm hỏng.
            </li>
            <li>
              Xì hơi, giảm hơi nhanh không rõ nguyên nhân (không phải do bị vật
              sắc nhọn đâm thủng).
            </li>
          </ul>

          <h3 className="font-bold text-gray-800 mb-2 mt-4 text-red-500">
            - CÁC LỖI KHÔNG ĐƯỢC BẢO HÀNH:
          </h3>
          <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-700">
            <li>
              KHÁCH BƠM BÓNG BẰNG CÁC LOẠI BƠM ĐIỆN, BƠM XE ĐẠP... KO KIỂM SOÁT
              ĐƯỢC ÁP SUẤT DẪN ĐẾN NỔ BÓNG.
            </li>
            <li>
              Các lỗi chủ quan trong quá trình sử dụng như bị vật sắc nhọn đâm
              thủng, ma sát với nền sân cứng gây hao mòn.
            </li>
          </ul>

          {/* Hướng dẫn bơm bóng */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <img
              src="LINK_ANH_HUONG_DAN_BOM_BONG" // Thay link ảnh của bạn vào đây
              alt="Hướng dẫn bơm bóng"
              className="w-full h-auto border"
            />
            <img
              src="LINK_ANH_KIEN_THUC_VE_BONG" // Thay link ảnh của bạn vào đây
              alt="Kiến thức về bóng"
              className="w-full h-auto border"
            />
          </div>
        </div>

        {/* PHẦN C: SẢN PHẨM KHÁC */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-red-600 uppercase mb-4">
            C. ĐỐI VỚI CÁC SẢN PHẨM VÀ PHỤ KIỆN CHÍNH HÃNG KHÁC:
          </h2>
          <p className="text-gray-700">
            Không áp dụng chính sách bảo hành. Các sản phẩm và phụ kiện chính
            hãng sẽ được kiểm tra kỹ lưỡng trước khi gửi đến tay khách hàng. Nếu
            khi nhận hàng khách hàng phát hiện sản phẩm lỗi, giữ nguyên trạng
            hộp và liên hệ shop để hỗ trợ đổi mới.
          </p>
        </div>
      </div>
    </div>
  );
}
