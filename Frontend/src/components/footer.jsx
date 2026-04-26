import React from "react";

export default function Footer() {
  return (
    <footer className="main-footer bg-dark-color text-white py-12">
      <div className="w-[90%] max-w-[1400px] mx-auto">
        <div className="footer-columns flex flex-col md:flex-row justify-between gap-8">
          <div className="footer-column flex-1">
            <h4 className="text-lg font-bold mb-4">THSPORT</h4>
            <p className="text-sm text-gray-400">
              Hệ thống bán giày bóng đá chính hãng với nhiều năm kinh nghiệm,
              mang đến sản phẩm chất lượng và dịch vụ tốt nhất.
            </p>
          </div>
          <div className="footer-column flex-1">
            <h4 className="text-lg font-bold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="text-sm">
              <li>
                <a
                  href="#"
                  className="block py-1 text-gray-400 hover:text-white"
                >
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 text-gray-400 hover:text-white"
                >
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 text-gray-400 hover:text-white"
                >
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 text-gray-400 hover:text-white"
                >
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column flex-1">
            <h4 className="text-lg font-bold mb-4">Kết nối với chúng tôi</h4>
            <div className="social-links flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-xl text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-xl text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="text-xl text-gray-400 hover:text-white"
              >
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
        <div className="copyright text-center mt-8 pt-8 border-t border-t-gray-700 text-sm text-gray-500">
          &copy; 2025 THSPORT. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
