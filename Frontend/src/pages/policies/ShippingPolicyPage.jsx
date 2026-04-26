// src/pages/general/ShippingPolicyPage.jsx
import React from "react";

export default function ShippingPolicyPage() {
  return (
    <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-10">
      {/* Tiêu đề chính */}
      <h1 className="text-3xl font-bold text-center mb-8 uppercase text-gray-800 border-b-2 border-gray-200 pb-4">
        CHÍNH SÁCH VẬN CHUYỂN VÀ GIAO NHẬN
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-gray-700 leading-relaxed text-sm md:text-base">
        <p className="mb-6 font-bold text-yellow-600 text-center">
          THSPORT có liên kết với các đối tác giao hàng GRAB, AHAMOVE, GHTK,
          VIETTEL POST giao nhận hàng đến tận tay khách hàng trên toàn bộ lãnh
          thổ Việt Nam.
        </p>

        {/* PHẦN A */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 uppercase mb-4">
            A. CƯỚC PHÍ VẬN CHUYỂN
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Đối với khách hàng ở TP.HCM và các tỉnh lân cận:{" "}
              <em>
                Miễn phí cước vận chuyển bằng GrabBike/Ahamove (tối đa
                50.000vnđ) với đơn hàng từ 1.000.000vnđ trở lên.
              </em>
            </li>
            <li>
              Đối với khách hàng ở các Tỉnh, TP khác:{" "}
              <em>
                Miễn phí cước vận chuyển với đơn hàng từ 1.000.000vnđ trở lên
                (không áp dụng cho hình thức giao hoả tốc).
              </em>
            </li>
            <li>
              Gửi nhà xe, chành xe:{" "}
              <em>
                Hỗ trợ cước gửi nhà xe, chành xe (tối đa 50.000vnđ) với đơn hàng
                từ 1.000.000vnđ trở lên.
              </em>
            </li>
            <li>
              Điều chuyển hàng hoá từ chi nhánh khác qua chi nhánh cho khách
              thử:{" "}
              <em>
                THSPORT hỗ trợ ship grab tối đa 30.000vnđ, phần chênh lệch khách
                hàng sẽ thanh toán.
              </em>
            </li>
            <li>
              Dịch vụ thử giày - thanh toán tại nhà: Đối với khách hàng mới,
              chưa từng có thông tin mua hàng tại THSPORT,{" "}
              <strong>Khách hàng sẽ đặt cọc trước 100.000vnđ</strong>, tiền cọc
              được trừ vào giá sản phẩm.{" "}
              <strong>
                Khách nhận hàng sẽ được KIỂM TRA SẢN PHẨM, THỬ GIÀY và sau đó
                thanh toán cho shipper.
              </strong>{" "}
              Trong trường hợp khách không nhận hàng, tiền cọc được tính là phí
              vận chuyển 2 chiều và sẽ không hoàn lại. Đối với khách hàng là
              Member có hạng VÀNG, BẠCH KIM, KIM CƯƠNG sẽ không cần đặt cọc đối
              với dịch vụ này.
            </li>
          </ol>

          <div className="bg-gray-50 p-4 my-4 border-l-4 border-red-500 text-sm">
            - Quý khách vui lòng{" "}
            <strong>kiểm tra kỹ hàng hoá ngay khi nhận hàng</strong> từ người
            giao hàng, nếu có vấn đề liên quan tới mẫu mã, chất lượng, số lượng
            hàng hoá không đúng như trong đơn đặt hàng, Quý khách vui lòng liên
            hệ <strong>Hotline: 0789.970.907</strong> để phối hợp với đơn vị
            chuyển phát hàng hóa xử lý.
          </div>

          <p className="mt-2">
            8. Các chi phí vận chuyển 2 chiều phát sinh trong quá trình bảo hành
            hoặc bảo hành:{" "}
            <span className="italic">sẽ do khách hàng thanh toán.</span>
          </p>
          <p className="mt-2">
            9.{" "}
            <strong>
              Những trường hợp đổi hàng do vận chuyển nhầm Size, nhầm mẫu:
            </strong>{" "}
            <span className="text-yellow-600 font-bold">THSPORT</span> sẽ chịu
            chi phí vận chuyển 2 chiều và cam kết mang đến cho khách hàng một
            sản phẩm ưng ý nhất.
          </p>
        </div>

        {/* PHẦN B */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 uppercase mb-4">
            B. THỜI GIAN VẬN CHUYỂN
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Đối với khách hàng ở TP HCM:{" "}
              <strong className="text-red-600">từ 1 - 2 ngày</strong>
            </li>
            <li>
              Đối với khách hàng, TP khác:{" "}
              <strong className="text-red-600">
                từ 3 - 5 ngày (tuỳ khu vực)
              </strong>
            </li>
          </ul>
          <div className="mt-2 italic text-gray-500 bg-gray-100 p-2 rounded inline-block">
            Lưu ý: thời gian vận chuyển chỉ mang tính chất tương đối, còn phụ
            thuộc vào những yếu tố khách quan khác.
          </div>
        </div>

        {/* PHẦN C */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 uppercase mb-4">
            C. NHỮNG LƯU Ý KHI NHẬN HÀNG:
          </h2>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              THSPORT và các đối tác vận chuyển luôn cố gắng thực hiện việc giao
              hàng đến quý khách hàng đúng theo thời gian đã thông báo. Tuy
              nhiên, trong một vài trường hợp đặc biệt như thiên tai, thời tiết,
              giao thông...thời gian giao hàng có thể sẽ dài hơn so với thực tế.{" "}
              <strong>
                Khách hàng có thể từ chối nhận hàng và huỷ đơn hàng nếu việc
                giao hàng chậm trễ quá thời gian THSPORT cam kết.
              </strong>
            </li>
            <li>
              Sản phẩm của THSPORT khi giao đến cho khách hàng phải còn nguyên
              đai, nguyên kiện, chưa có dấu hiệu bóc mở, có đầy đủ hóa đơn của
              THSPORT. Nếu khi hàng nhận thấy có dấu hiệu bất thường có thể từ
              chối nhận hàng và liên hệ với Bộ phận chăm sóc khách hàng qua
              Hotline <strong>0789.970.907</strong> (từ 9h - 21h tất cả các ngày
              trong tuần).
            </li>
            <li>
              Quý khách hàng vui lòng kiểm tra sản phẩm ngay tại chỗ trước khi
              thanh toán (nếu có) cho nhân viên giao hàng. (Lưu ý: quý khách
              không được phép thử sản phẩm).
            </li>
            <li className="text-red-600 font-semibold">
              - Dịch vụ vận chuyển của THSPORT sẽ chịu trách nhiệm với hàng hóa
              và các rủi ro như mất mát hoặc hư hại của hàng hóa trong suốt quá
              trình vận chuyển hàng từ kho hàng THSPORT đến khách hàng.
            </li>
            <li className="text-red-600 font-semibold">
              - THSPORT cam kết tất cả hàng hóa gửi đến khách hàng theo đơn hàng
              đều là hàng chính hãng mới 100% (có đầy đủ hoá đơn bán hàng, chứng
              từ chính hãng, được bảo hành chính hãng theo chính sách của công
              ty).
            </li>
            <li>
              - Sau khi nhận hàng quý khách vui lòng quay lại video clip quá
              trình mở kiện hàng từ lúc bắt đầu khui ngoại quan đến khi kiểm tra
              sản phẩm bên trong thùng hàng để THSPORT có cơ sở đối chiếu và xử
              lý khiếu nại khi có vấn đề phát sinh. Lưu ý: video cần quay rõ tem
              kiện hàng & mã đơn hàng, tình trạng ngoại quan (băng keo, seal,
              hình dạng thùng hàng) và tình trạng sản phẩm bên trong.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
