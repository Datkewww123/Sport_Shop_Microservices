import React from "react";
import { Link } from "react-router-dom";

export default function PositionCard({
  imageUrl,
  title,
  description,
  linkUrl,
}) {
  return (
    <Link
      to={linkUrl}
      className="position-card relative rounded-lg overflow-hidden shadow-lg group block aspect-[3/4]"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="position-info absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white p-4 pt-12 text-center transition-all duration-300 group-hover:pb-6">
        <h3 className="text-lg uppercase font-bold tracking-wider">{title}</h3>
        <p className="text-xs opacity-90 mt-1">{description}</p>
      </div>
    </Link>
  );
}
