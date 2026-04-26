// src/utils/performance.js
// Performance optimization utilities

/**
 * Debounce function - delay execution until after wait time
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - execute at most once per wait time
 */
export function throttle(func, wait = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('img.lazy');
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Format number to Vietnamese currency
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Format date to Vietnamese locale
 */
export function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(new Date(date));
}

/**
 * Simple cache implementation
 */
export class SimpleCache {
  constructor(maxAge = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.maxAge = maxAge;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const age = Date.now() - item.timestamp;
    if (age > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.cache.has(key) && this.get(key) !== null;
  }
}

/**
 * Preload critical images
 */
export function preloadImages(urls) {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Get optimized image URL (if using CDN with resize capability)
 */
export function getOptimizedImageUrl(url, width, height, quality = 80) {
  // Example for Cloudinary or similar CDN
  // Adjust based on your CDN
  if (!url) return url;
  
  // If local image, return as is
  if (url.startsWith('/') || url.startsWith('blob:')) return url;
  
  // Add query params for optimization if supported
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${width}&h=${height}&q=${quality}`;
}

export default {
  debounce,
  throttle,
  lazyLoadImages,
  isInViewport,
  formatCurrency,
  formatDate,
  SimpleCache,
  preloadImages,
  getOptimizedImageUrl,
};
