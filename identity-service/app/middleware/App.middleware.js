// Backend/app/middleware/App.middleware.js
// General application middleware

module.exports = (app) => {
  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // Request ID middleware
  app.use((req, res, next) => {
    req.id = require('crypto').randomBytes(8).toString('hex');
    next();
  });

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
};

module.exports = module.exports;
