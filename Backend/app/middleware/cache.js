// Backend/src/middleware/cache.js
// Simple in-memory caching middleware để tối ưu hóa product queries

const cache = new Map();
const CACHE_TTL = 30 * 1000; // 30 giây - Giảm để cập nhật nhanh hơn

// Clear cache on startup
exports.initCache = () => {
  cache.clear();
  console.log('[CACHE INITIALIZED] All caches cleared on startup');
};

exports.cacheProducts = (req, res, next) => {
  // Chỉ cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  // Tạo cache key từ URL + query params
  const cacheKey = `products:${req.originalUrl}`;
  
  // Kiểm tra cache
  const cachedData = cache.get(cacheKey);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    console.log(`[CACHE HIT] ${cacheKey}`);
    // Thêm header để browser không cache
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.json(cachedData.data);
  }

  // Lưu original res.json để intercept response
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    // Thêm header để browser không cache
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    // Lưu vào cache
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    console.log(`[CACHE SET] ${cacheKey}`);
    return originalJson(data);
  };

  next();
};

// Clear cache khi có write operations (POST, PUT, DELETE)
exports.clearProductCache = (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    console.log('[CACHE CLEARED] Invalidating all product caches');
    // Xóa tất cả cache entries có prefix 'products:'
    for (const key of cache.keys()) {
      if (key.startsWith('products:')) {
        cache.delete(key);
      }
    }
  }
  next();
};

// Clear cache manually
exports.invalidateCache = () => {
  for (const key of cache.keys()) {
    if (key.startsWith('products:')) {
      cache.delete(key);
    }
  }
};
