import React from "react";

export default function RepairService() {
  return (
    <div className="repair-page">
      {/* 1. PHẦN TIÊU ĐỀ & GIỚI THIỆU */}
      <div className="container w-[90%] max-w-[1000px] mx-auto py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold uppercase text-primary mb-6">
          Dịch Vụ Sửa Chữa <br />
          <span className="text-dark-color">Giày Đá Banh Chính Hãng</span>
        </h1>

        <p className="text-gray-600 leading-relaxed max-w-[800px] mx-auto text-justify md:text-center">
          Bóng đá là môn thể thao đối kháng, những va chạm, trầy xước, hư hao
          của đôi giày là không thể tránh khỏi. Với kinh nghiệm hơn 10 năm bán
          giày, chúng tôi hiểu rõ từng chi tiết và những vấn đề hay gặp trên 1
          đôi giày bóng đá. Dịch vụ sửa chữa giày bóng đá chính hãng ra đời để
          hỗ trợ khách hàng "cứu" lại những đôi giày cũ đã bị hư hao theo thời
          gian, vì đối với nhiều khách hàng, đôi giày là người bạn đồng hành họ
          không nỡ bỏ.
        </p>
      </div>

      {/* 2. DỊCH VỤ 1: ÉP KEO + MAY VẾT HỞ (Nền xám nhẹ) */}
      <div className="bg-gray-50 py-16">
        <div className="container w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Cột Trái: Nội dung */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4 uppercase">
              Ép keo + May vết hở
            </h2>
            <p className="text-gray-700 mb-4 text-justify">
              Khi đôi giày gặp các vết hở ở vị trí hay ma sát, vết hở KHÔNG QUÁ
              5CM và GIÀY CHƯA BỊ MẤT FORM, chúng tôi sẽ áp dụng phương pháp ép
              keo + may vết hở để khắc phục lỗi và đảm bảo chắc chắn không bị hở
              lại.
            </p>

            <p className="font-bold text-lg mb-4">
              Giá: <span className="text-red-600">30.000đ</span> -
              <span className="text-gray-600 text-sm font-normal ml-2">
                Thời gian sửa chữa: 10-20 ngày
              </span>
            </p>

            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-blue-600 mb-2 text-sm">
                Các trường hợp hay gặp lỗi này:
              </h4>
              <p className="text-sm text-gray-600">
                2 bên má trong hoặc má ngoài hay sút nhiều hoặc ma sát với mặt
                cỏ.
              </p>
            </div>
          </div>

          {/* Cột Phải: Hình ảnh Minh họa */}
          <div className="order-1 md:order-2">
            <img
              src="https://file.hstatic.net/1000061481/file/untitled-1-01-02_ea71d3f0e8f54010ae5768c2ba12c872.jpg"
              alt="Hình ảnh trước và sau khi sửa"
              className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* 3. DỊCH VỤ 2: ÉP KEO + MAY 50% (Nền trắng) */}
      <div className="bg-white py-16">
        <div className="container w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Cột Trái: Hình ảnh Minh họa */}
          <div className="order-1">
            <div className="relative group">
              <img
                src="https://file.hstatic.net/1000061481/file/untitled-1-01-02-02_95ac219e002e4b659cf2129edc6a8028.jpg"
                alt="Ép keo và May 50%"
                // w-full: Chiếm hết chiều rộng
                // h-auto: Chiều cao tự động theo tỷ lệ
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Cột Phải: Nội dung */}
          <div className="order-2">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4 uppercase">
              Ép keo + May 50%
            </h2>
            <p className="text-gray-700 mb-4 text-justify">
              Khi đôi giày gặp các trường hợp hở keo phần mũi hoặc đệm gót (vị
              trí thường xuyên ma sát nhiều), chúng tôi sẽ sử dụng phương pháp
              ép keo + may 50% để khắc phục lỗi và đảm bảo chắc chắn không bị hở
              lại.
            </p>

            <p className="font-bold text-lg mb-4">
              Giá: <span className="text-red-600">40.000đ/chiếc</span> -
              <span className="text-gray-600 text-sm font-normal ml-2">
                Thời gian sửa chữa: 10-20 ngày
              </span>
            </p>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-bold text-blue-600 mb-2 text-sm">
                Các trường hợp hay gặp lỗi này:
              </h4>
              <p className="text-sm text-gray-600">
                Phần mũi của các đôi giày da tự nhiên hoặc Phần đệm gót của các
                đôi giày có bộ đệm.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-16">
        <div className="container w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Cột Trái: Nội dung */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4 uppercase">
              Ép keo + May toàn bộ
            </h2>
            <p className="text-gray-700 mb-4 text-justify">
              Các đôi giày bị hở keo nặng, vết hở lớn và bị hở nhiều vị trí,
              chúng tôi sẽ sử dụng phương pháp ép keo + may toàn bộ đế giữ lại
              được form của đôi giày và đảm bảo chắc chắn đôi giày không bị hở
              lại.
            </p>

            <p className="font-bold text-lg mb-4">
              Giá: <span className="text-red-600">50.000đ/chiếc</span> -
              <span className="text-gray-600 text-sm font-normal ml-2">
                Thời gian sửa chữa: 10-20 ngày
              </span>
            </p>

            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-blue-600 mb-2 text-sm">
                Các trường hợp hay gặp lỗi này:
              </h4>
              <p className="text-sm text-gray-600">
                Các đôi giày sử dụng sau một thời gian dài keo sẽ tự khô hoặc va
                chạm, ma sát nhiều.
              </p>
            </div>
          </div>

          {/* Cột Phải: Hình ảnh Minh họa (Ảnh ghép sẵn) */}
          <div className="order-1 md:order-2">
            <div className="relative group">
              <img
                src="https://file.hstatic.net/1000061481/file/untitled-1-01-02-02-02_d9fefd9257ca455ab526655d2c1706d8.jpg"
                alt="Ép keo và May toàn bộ"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="container w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Cột Trái: Hình ảnh Minh họa (Ảnh ghép sẵn) */}
          <div className="order-1">
            <div className="relative group">
              <img
                src="https://file.hstatic.net/1000061481/file/hinh_trang_sua_chua_giay-02_a76d827530ce48a898839f70baf6f78a.jpg"
                alt="Đắp da và Vá chỗ rách"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Cột Phải: Nội dung */}
          <div className="order-2">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4 uppercase">
              Đắp da - Vá chỗ rách
            </h2>
            <p className="text-gray-700 mb-4 text-justify">
              Các đôi giày bị lủng, rách da do va chạm hoặc upper bị mục nát do
              bảo quản không tốt, chúng tôi sẽ sử dụng phương pháp đắp 1 lớp da
              lên trên và may vết rách. Đây là cách duy nhất để cứu lại đôi
              giày, chỉ cố gắng làm chắc chắn để giữ lại form,
              <span className="font-bold text-red-600">
                {" "}
                KHÔNG ĐẶT NẶNG VẤN ĐỀ THẨM MỸ{" "}
              </span>
              vì không có lớp da giống 100% của giày và cũng không thể đắp bên
              dưới upper vì không chắc chắn và sẽ gây cộm chân khi mang.
            </p>

            <p className="font-bold text-lg mb-4">
              Giá: <span className="text-red-600">60.000đ/chiếc</span> -
              <span className="text-gray-600 text-sm font-normal ml-2">
                Thời gian sửa chữa: 10-20 ngày
              </span>
            </p>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-bold text-blue-600 mb-2 text-sm">
                Các trường hợp hay gặp lỗi này:
              </h4>
              <p className="text-sm text-gray-600">
                Các đôi giày có upper mỏng, dễ rách hoặc upper bằng sợi vải dệt,
                thi đấu va chạm, ma sát nhiều hoặc bảo quản không tốt sẽ dễ mục
                rách.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
