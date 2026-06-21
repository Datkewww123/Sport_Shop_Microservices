// src/components/LoadingSkeleton.jsx
import React from "react";

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-gray-200 aspect-square w-full" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-5 bg-gray-200 rounded w-1/2 mt-4" />
        <div className="h-9 bg-gray-200 rounded-lg w-full mt-2" />
      </div>
    </div>
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Category/Brand Card Skeleton
export function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

// Full Page Loading Spinner
export function LoadingSpinner({ size = "medium", text = "Đang tải..." }) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <i className={`fas fa-spinner fa-spin ${sizeClasses[size]} text-primary`} />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );
}

// Inline Button Loading
export function ButtonLoading() {
  return (
    <i className="fas fa-spinner fa-spin" />
  );
}

export default {
  SkeletonCard,
  ProductCardSkeleton,
  ProductGridSkeleton,
  CategoryCardSkeleton,
  LoadingSpinner,
  ButtonLoading
};
