import React from "react";

// Component này tạo ra cấu trúc lặp lại của <section> và <h2 .section-title>
export default function Section({ title, children, className = "" }) {
  return (
    /* .homepage-section { margin-bottom: 50px; }
      Dịch -> mb-12
    */
    <section className={`homepage-section mb-12 ${className}`}>
      {/* .section-title { ... text-align: center; font-size: 24px; ... }
        .section-title::after { ... }
        Dịch -> text-center text-2xl font-bold uppercase mb-8 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary
      */}
      <h2 className="section-title text-center text-2xl font-bold uppercase mb-8 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}
