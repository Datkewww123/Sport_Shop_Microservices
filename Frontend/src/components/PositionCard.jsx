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
      className="position-card relative rounded-lg overflow-hidden shadow-lg group"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-1.1"
      />
      <div className="position-info absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 pt-8 text-center">
        <h3 className="text-lg uppercase font-bold">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </Link>
  );
}
