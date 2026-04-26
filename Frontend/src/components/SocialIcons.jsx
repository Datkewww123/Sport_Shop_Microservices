import React from "react";

export default function SocialIcons() {
  return (
    /* .social-icons { 
        position: fixed; right: 20px; top: 50%; 
        transform: translateY(-50%); z-index: 1001; ... 
      }
      Dịch -> fixed right-5 top-1/2 -translate-y-1/2 z-[1001] flex flex-col gap-2.5
    */
    <div className="social-icons fixed right-5 top-1/2 -translate-y-1/2 z-[1001] flex flex-col gap-2.5">
      {/* .social-icons a { ... width: 50px; height: 50px; border-radius: 50%; ... }
        a:hover { transform: scale(1.1); }
        .zalo { background-color: #0068ff; }
        Dịch -> flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-md transition-transform hover:scale-110
      */}
      <a
        href="#"
        className="zalo flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-md transition-transform hover:scale-110 bg-[#0068ff]"
      >
        <i className="fab fa-rocketchat" />
      </a>
      <a
        href="#"
        className="phone flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-md transition-transform hover:scale-110 bg-[#dc3545]"
      >
        <i className="fa fa-phone" />
      </a>
      <a
        href="#"
        className="messenger flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl shadow-md transition-transform hover:scale-110 bg-[#0084ff]"
      >
        <i className="fab fa-facebook-messenger" />
      </a>
    </div>
  );
}
