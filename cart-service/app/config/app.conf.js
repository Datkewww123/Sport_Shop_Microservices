module.exports = {
  app: {
    name: 'cart-service',
    version: '1.0.0',
    description: 'Cart microservice - shopping cart management',
    keywords: ['cart', 'shopping', 'microservice'],
    author: 'THSport'
  },
  server: {
    prefix: '/api',
    domain: process.env.DOMAIN || 'http://localhost:3003',
    port: process.env.PORT || 3003,
    host: process.env.HOST || '0.0.0.0',
    apiVersion: 'v1'
  },
  swagger: {
    title: 'Cart Service API',
    version: '1.0.0',
    description: 'API for shopping cart management',
    termsOfService: 'http://localhost:3003/terms/',
    contact: {
      name: 'THSport',
      email: 'contact@thsport.com'
    },
    license: {
      name: 'MIT',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    },
    servers: [
      {
        url: 'http://localhost:3003/api',
        description: 'Local server'
      }
    ]
  }
};