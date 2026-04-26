import React from "react";
import { Link } from "react-router-dom";
export default function CategoryCard({
  size,
  imageUrl,
  title,
  description,
  alt,
  gridClass = "",
  linkUrl,
}) {
  const baseClasses =
    "category-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl";

  if (size === "large") {
    return (
      <Link
        to={linkUrl}
        className={`${baseClasses} ${gridClass} text-center bg-white pb-4`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto aspect-square object-cover"
        />
        <h3 className="text-base font-bold mx-2.5 my-2.5">{title}</h3>
        <p className="text-sm text-gray-600 px-2.5">{description}</p>
      </Link>
    );
  }
  return null;
}
