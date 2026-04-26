// Backend/app/config/db.conf.js
// Database configuration

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://phamhungtp2005_db_user:EETQAWrXfq7XiO27@cluster0.06tutrj.mongodb.net/webdemo-thsport?retryWrites=true&w=majority',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 45000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }
  },

  dbName: process.env.DB_NAME || 'webdemo-thsport',

  collections: {
    users: 'users',
    products: 'products',
    categories: 'categories',
    brands: 'brands',
    orders: 'orders',
    carts: 'carts',
    inventory: 'inventory',
    news: 'news',
    promotions: 'promotions'
  }
};
