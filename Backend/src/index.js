require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { initCache } = require('./middleware/cache');
const app = express();

// Initialize cache (clear on startup)
// initCache();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// UTF-8 Encoding Middleware
app.use((req, res, next) => {
  res.charset = 'utf-8';
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/webdemo-thsport';

mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  authSource: 'admin'
})
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TH Sport API',
    version: '1.0.0',
    documentation: process.env.NODE_ENV === 'production' ? 'https://thsport-backend.onrender.com/api-docs' : `http://localhost:${PORT}/api-docs`
  });
});

// Swagger Documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//   customCss: '.swagger-ui .topbar { display: none }',
//   customSiteTitle: 'TH Sport API Documentation',
//   swaggerOptions: {
//     persistAuthorization: true,
//     displayRequestDuration: true,
//     docExpansion: 'none',
//     filter: true,
//     showExtensions: true,
//     showCommonExtensions: true
//   }
// }));

// Route imports
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/news', require('./routes/news'));
app.use('/api/promotions', require('./routes/promotions'));
app.use('/api/admin', require('./routes/admin'));

// Error handler middleware (must be last)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  const docsUrl = process.env.NODE_ENV === 'production' ? 'https://thsport-backend.onrender.com/api-docs' : `http://localhost:${PORT}/api-docs`;
  console.log(`✓ API Documentation available at ${docsUrl}`);
  console.log(`✓ MongoDB connected to ${MONGO_URI}`);
});
