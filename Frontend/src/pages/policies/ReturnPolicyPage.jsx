// src/pages/general/ReturnPolicyPage.jsx
import React from "react";

export default function ReturnPolicyPage() {
  return (
    <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-10">
      {/* Tiêu đề chính */}
      <h1 className="text-3xl font-bold text-center mb-8 uppercase text-gray-800 border-b-2 border-gray-200 pb-4">
        QUY ĐỊNH ĐỔI HÀNG
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-gray-700 leading-relaxed text-sm md:text-base">
        {/* PHẦN A */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-600 uppercase mb-4">
            A. QUY ĐỊNH ĐỔI HÀNG VỚI TỪNG LOẠI SẢN PHẨM:
          </h2>

          {/* 1. GIÀY BÓNG ĐÁ */}
          <div className="mb-6">
            <h3 className="text-blue-500 font-bold uppercase mb-2 text-sm">
              GIÀY BÓNG ĐÁ CHÍNH HÃNG SẼ ĐƯỢC HỖ TRỢ ĐỔI HÀNG TRONG ĐIỀU KIỆN:
            </h3>
            <ul className="list-none space-y-1 mb-2 pl-2">
              <li className="text-red-600">
                - GIÀY MỚI 100% CHƯA SỬ DỤNG,{" "}
                <span className="text-black font-normal">
                  chưa mang chạy thử, đá thử.
                </span>
              </li>
              <li className="text-red-600">
                - GIÀY HOÀN TOÀN SẠCH SẼ, KHÔNG CÓ BẤT KỲ SỰ HƯ HAO NÀO DO TÁC
                ĐỘNG TỪ PHÍA KHÁCH HÀNG{" "}
                <span className="text-black font-normal">
                  (vô tình hoặc cố ý) làm giày bị rách upper, trầy xước đế, đứt
                  dây, trầy lót...
                </span>
              </li>
              <li className="text-red-600">
                - ĐẦY ĐỦ HỘP THEO GIÀY, CÒN NGUYÊN TEM, TAG, HOÁ ĐƠN MUA HÀNG{" "}
                <span className="text-black font-normal">
                  (trường hợp khách làm mất hộp sẽ bị tính phí 5% giá trị giày)
                </span>
              </li>
              <li className="text-red-600">
                - CÒN THỜI GIAN ĐỔI HÀNG:{" "}
                <span className="text-black font-normal">
                  14 ngày kể từ khi khách nhận được sản phẩm
                </span>
              </li>
            </ul>
            <div className="bg-yellow-200 p-2 text-xs md:text-sm font-bold text-black">
              Khách hàng lưu ý KIỂM TRA KỸ GIÀY TRƯỚC KHI THANH TOÁN, các trường
              hợp sản phẩm không còn mới 100%, đế giày bị trầy do mang ra sân đá
              thử, có tác động (vô tình hoặc cố ý) làm Upper sản phẩm bị rách,
              trầy xước THSPORT có thể từ chối đổi hàng hoặc sẽ phải thu phí
              10-30% giá trị để thanh lý sản phẩm.
            </div>
          </div>

          {/* 2. QUẢ BÓNG ĐÁ */}
          <div className="mb-6">
            <h3 className="text-blue-500 font-bold uppercase mb-2 text-sm">
              QUẢ BÓNG ĐÁ SẼ ĐƯỢC HỖ TRỢ ĐỔI HÀNG TRONG ĐIỀU KIỆN:
            </h3>
            <ul className="list-none space-y-1 mb-2 pl-2">
              <li className="text-red-600">
                - BÓNG MỚI 100% CHƯA SỬ DỤNG, ĐẦY ĐỦ HỘP THEO BÓNG (nếu có), CÒN
                NGUYÊN TEM, TAG, HOÁ ĐƠN MUA HÀNG{" "}
                <span className="text-black font-normal">
                  (trường hợp khách làm mất hộp sẽ bị tính phí 5% giá trị sản
                  phẩm)
                </span>
              </li>
              <li className="text-red-600">
                - BÓNG HOÀN TOÀN SẠCH SẼ, KHÔNG CÓ BẤT KỲ SỰ HƯ HAO NÀO DO TÁC
                ĐỘNG TỪ PHÍA KHÁCH HÀNG{" "}
                <span className="text-black font-normal">
                  (vô tình hoặc cố ý) làm bóng bị rách, trầy xước, bị vật sắc
                  nhọn đâm thủng...
                </span>
              </li>
              <li className="text-red-600">
                - BÓNG GẶP LỖI SẢN XUẤT KHI CÒN THỜI GIAN BẢO HÀNH{" "}
                <span className="text-black font-normal">
                  (thụt van, xì hơi từ từ không rõ nguyên nhân nhưng không phải
                  bị vật sắc nhọn đâm thủng)
                </span>
              </li>
              <li className="text-red-600">
                - CÒN THỜI GIAN ĐỔI HÀNG:{" "}
                <span className="text-black font-normal">
                  14 ngày kể từ khi khách nhận được sản phẩm
                </span>
              </li>
            </ul>
            <div className="bg-yellow-200 p-2 text-xs md:text-sm font-bold text-black">
              Khách hàng lưu ý KIỂM TRA KỸ BÓNG TRƯỚC KHI THANH TOÁN. Các trường
              hợp không đảm bảo điều kiện đổi hàng hoặc bóng bị hư hỏng do tác
              động từ phía khách hàng (bị vật sắc nhọn đâm thủng, bơm bóng sai
              cách không kiểm soát áp suất làm nổ bóng...) THSPORT có thể từ
              chối hỗ trợ đổi hàng.
            </div>
          </div>

          {/* 3. ÁO BÓNG ĐÁ */}
          <div className="mb-6">
            <h3 className="text-blue-500 font-bold uppercase mb-2 text-sm">
              ÁO BÓNG ĐÁ CHÍNH HÃNG SẼ ĐƯỢC HỖ TRỢ ĐỔI HÀNG TRONG ĐIỀU KIỆN:
            </h3>
            <ul className="list-none space-y-1 mb-2 pl-2">
              <li className="text-red-600">
                - ÁO CÒN MỚI 100%, CÒN NGUYÊN TEM, TAG, HOÁ ĐƠN MUA HÀNG{" "}
                <span className="text-black font-normal">
                  (trường hợp khách làm mất tag sẽ bị tính phí 10% giá trị sản
                  phẩm)
                </span>
              </li>
              <li className="text-red-600">
                - ÁO HOÀN TOÀN SẠCH SẼ, KHÔNG CÓ BẤT KỲ SỰ HƯ HAO NÀO DO TÁC
                ĐỘNG TỪ PHÍA KHÁCH HÀNG{" "}
                <span className="text-black font-normal">
                  (vô tình hoặc cố ý) làm áo bị rách, phai màu, bị ố...do ngâm
                  giặt chung với quần áo khác.
                </span>
              </li>
              <li className="text-red-600">
                - CÒN THỜI GIAN ĐỔI HÀNG:{" "}
                <span className="text-black font-normal">
                  14 ngày kể từ khi khách nhận được sản phẩm
                </span>
              </li>
            </ul>
            <div className="bg-yellow-200 p-2 text-xs md:text-sm font-bold text-black">
              Khách hàng lưu ý KIỂM TRA KỸ ÁO TRƯỚC KHI THANH TOÁN. Các trường
              hợp Áo bóng đá chính hãng không đảm bảo điều kiện đổi hàng THSPORT
              có thể từ chối hỗ trợ đổi hàng.
            </div>
          </div>

          {/* 4. PHỤ KIỆN KHÁC */}
          <div className="mb-6">
            <h3 className="text-blue-500 font-bold uppercase mb-2 text-sm">
              CÁC PHỤ KIỆN KHÁC (VỚ BÓNG ĐÁ, BỌC ỐNG ĐỒNG, BALO TÚI XÁCH, PHỤ
              KIỆN RA SÂN...) SẼ ĐƯỢC HỖ TRỢ ĐỔI HÀNG TRONG ĐIỀU KIỆN:
            </h3>
            <ul className="list-none space-y-1 mb-2 pl-2">
              <li className="text-red-600">
                - SẢN PHẨM CÒN MỚI 100%, CÒN NGUYÊN TEM, TAG, HOÁ ĐƠN MUA HÀNG{" "}
                <span className="text-black font-normal">
                  (trường hợp khách làm mất tag sẽ bị tính phí 10% giá trị sản
                  phẩm)
                </span>
              </li>
              <li className="text-red-600">
                - SẢN PHẨM HOÀN TOÀN SẠCH SẼ, KHÔNG CÓ BẤT KỲ SỰ HƯ HAO NÀO TỪ
                PHÍA KHÁCH HÀNG{" "}
                <span className="text-black font-normal">
                  (vô tình hoặc cố ý) làm sản phẩm không còn nguyên vẹn 100%.
                </span>
              </li>
              <li className="text-red-600">
                - SẢN PHẨM GẶP LỖI SẢN XUẤT TRONG VÒNG 30 NGÀY KỂ TỪ NGÀY MUA
                HÀNG:{" "}
                <span className="text-black font-normal text-sm italic">
                  THSPORT sẽ hỗ trợ đổi cho khách hàng sang 1 sản phẩm mới.
                </span>
              </li>
            </ul>
            <div className="bg-yellow-200 p-2 text-xs md:text-sm font-bold text-black">
              Khách hàng lưu ý KIỂM TRA KỸ SẢN PHẨM TRƯỚC KHI THANH TOÁN. Các
              trường hợp phụ kiện không đảm bảo điều kiện đổi hàng THSPORT có
              thể từ chối hỗ trợ đổi hàng.
            </div>
          </div>
        </div>

        {/* PHẦN B */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-600 uppercase mb-4">
            B. NGUYÊN TẮC ĐỔI HÀNG:
          </h2>
          <p className="mb-2">
            Khách hàng Có thể đổi sang 1 hoặc nhiều sản phẩm có giá trị tương
            đương, Cao hơn (khách hàng sẽ bù thêm tiền), hoặc thấp hơn (
            <strong className="text-red-600">
              THSPORT hoàn lại không quá 500.000 VNĐ
            </strong>
            ) sau quá trình đổi hàng.
          </p>
          <p className="mb-2">
            <strong>
              Trong 1 số trường hợp đặc biệt khách đổi hàng quá thời gian quy
              định hoặc muốn trả hàng hoàn tiền, THSPORT vẫn sẽ hỗ trợ và thu
              phí 10% giá trị đơn hàng.
            </strong>
          </p>
          <p className="text-sm italic text-gray-600">
            Lưu ý: Khách hàng chỉ được <strong>đổi hàng 1 lần.</strong>
          </p>
        </div>

        {/* PHẦN C */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-600 uppercase mb-4">
            C. PHÍ VẬN CHUYỂN ĐỔI HÀNG:
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Đối với những trường hợp đổi hàng lý do chủ quan (đến từ khách
              hàng): Phí vận chuyển 2 chiều trong các trường hợp đổi trả hàng
              hay bảo hành sẽ do khách hàng thanh toán.
            </li>
            <li>
              Đối với những trường hợp đổi hàng lý do khách quan (đến từ sản
              phẩm như sản phẩm bị lỗi, nhân viên đóng gói nhầm size, nhầm mẫu):{" "}
              <strong className="text-yellow-600">THSPORT</strong> sẽ chịu phí
              vận chuyển 2 chiều và cam kết mang đến cho khách hàng một sản phẩm
              ưng ý nhất.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
