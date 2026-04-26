// src/pages/general/InspectionPolicyPage.jsx
import React from "react";

export default function InspectionPolicyPage() {
  return (
    <div className="container w-[90%] max-w-[1000px] mx-auto mt-10 py-10">
      {/* Tiêu đề chính */}
      <h1 className="text-3xl font-bold text-center mb-8 uppercase text-gray-800 border-b-2 border-gray-200 pb-4">
        CHÍNH SÁCH KIỂM HÀNG
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-gray-700 leading-relaxed text-sm md:text-base">
        {/* BƯỚC 1 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3">
            Bước 1: Khách hàng kiểm hàng
          </h2>
          <ul className="list-none space-y-2 pl-2">
            <li>
              - Trước khi ký biên bản nhận hàng, quý khách vui lòng mở hộp và
              kiểm tra tất cả các sản phẩm trước mặt đơn vị vận chuyển.
            </li>
            <li>
              - Nếu hàng hoá thiếu hoặc hư hỏng, vui lòng từ chối nhận hàng và
              gọi ngay vào <strong>hotline 0789.970.907</strong> để được hỗ trợ
              nhanh nhất. Chúng tôi sẽ không chịu trách nhiệm trong trường hợp
              quý khách báo mất mát, hư hỏng sau khi đã ký biên bản nhận hàng và
              đơn vị vận chuyển đã rời đi.
            </li>
            <li>
              - Nếu hàng hoá hư hỏng hoặc trầy xước, quý khách vui lòng tiến
              hành chụp hình hiện trạng của sản phẩm: Thấy rõ mã hàng, tem xe,
              chỗ sản phẩm hư hỏng, trầy xước,... và gửi hình ảnh đến chúng tôi
              để xác nhận.
            </li>
          </ul>
        </div>

        {/* BƯỚC 2 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3">
            Bước 2: Tiến hành xác nhận
          </h2>
          <ul className="list-none space-y-2 pl-2">
            <li>
              - Sau khi nhận được thông tin <strong>THSPORT</strong> sẽ tiến
              hành xác nhận tình trạng hàng hóa và xác nhận cho khách hàng có
              được đổi/trả hay không theo quy định của chính sách đổi trả của{" "}
              <strong>THSPORT</strong>.
            </li>
            <li>
              - Nhân viên CSKH của <strong>THSPORT</strong> sẽ điện vào mẫu
              đổi/trả hàng thay mặt khách hàng trên hệ thống.
            </li>
            <li>
              - Sau khi được xác nhận hàng được chấp nhận đổi/trả, vui lòng giữ
              hàng hóa trong trạng thái nguyên tem, mã hàng của{" "}
              <strong>THSPORT</strong> như ban đầu cùng giấy tờ liên quan như
              hóa đơn bán lẻ, hóa đơn đỏ, phiếu giao hàng.
            </li>
          </ul>
        </div>

        {/* BƯỚC 3 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-3">
            Bước 3: Phí vận chuyển đổi hàng:
          </h2>
          <ul className="list-none space-y-2 pl-2">
            <li>
              - Đối với những trường hợp đổi hàng lý do chủ quan (đến từ khách
              hàng): Phí vận chuyển 2 chiều sẽ do khách hàng thanh toán.
            </li>
            <li>
              - Đối với những trường hợp đổi hàng lý do khách quan (đến từ sản
              phẩm như sản phẩm bị lỗi, nhân viên đóng gói nhầm size, nhầm mẫu):{" "}
              <strong>THSPORT</strong> sẽ chịu chi phí vận chuyển 2 chiều và cam
              kết mang đến cho khách hàng một sản phẩm ưng ý nhất.
            </li>
          </ul>
        </div>

        {/* BƯỚC 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-3">
            Bước 4: Xác nhận và gửi hàng lại cho khách hàng
          </h2>
          <p className="mb-4">
            Sau khi đã nhận, kiểm tra và chấp nhận sản phẩm mà khách hàng muốn
            đổi, bộ phận chăm sóc khách hàng sẽ liên hệ để đổi hàng và gửi hàng
            lại cho khách hàng.
          </p>
          <div className="bg-gray-100 p-4 rounded text-sm italic">
            <strong>LƯU Ý:</strong> Nếu hàng hóa gửi về cho{" "}
            <strong>THSPORT</strong> không đáp ứng điều kiện đổi/trả đã nêu ở
            trên, khách hàng sẽ chịu trách nhiệm chi trả phần thiệt hại cho
            Chúng tôi hoặc được cộng thêm vào số tiền mà khách hàng phải chi trả
            cho sản phẩm được đổi.
          </div>
        </div>

        {/* ĐIỀU KIỆN VÀ QUY ĐỊNH */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-red-600 uppercase mb-4 underline decoration-red-600">
            Điều kiện và quy định đổi trả chung:
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Sản phẩm bị lỗi kỹ thuật được nhân viên kỹ thuật công ty chúng tôi
              xác định và nhìn nhận là lỗi do nhà sản xuất.
            </li>
            <li>
              Còn đầy đủ bao bì, vỏ hộp, không bị trầy xước, móp méo, hỏng hóc
              bên ngoài, đổ vỡ..
            </li>
            <li>Còn đầy đủ linh kiện, phụ kiện.</li>
            <li>
              Có đầy đủ các chứng từ kèm theo như biên nhận, hóa đơn, phiếu giao
              hàng, phiếu bảo hành, catalouge...
            </li>
            <li>
              Sản phẩm phải được đổi và trả hàng trong 2 ngày kể từ thời điểm
              giao hàng thành công. Trong trường hợp khách hàng đã lấy hóa đơn
              đỏ quý khách phải trả lại hóa đơn đỏ và các chứng từ kèm theo.
            </li>
            <li>
              Sản phẩm thuộc chương trình khuyến mãi và sản phẩm trả góp sẽ
              không được đổi trả.
            </li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500">
            Tuy nhiên đối với một số sản phẩm chúng tôi sẽ không áp dụng những
            điều kiện đổi trả giống như trên, trong quá trình tư vấn bán hàng
            chúng tôi sẽ tư vấn cụ thể về thời hạn cũng như hình thức đổi trả
            cho từng sản phẩm để khách hàng tham khảo khi có nhu cầu mua sản
            phẩm đó.
          </p>
        </div>
      </div>
    </div>
  );
}
