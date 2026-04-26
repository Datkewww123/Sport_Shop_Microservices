# WEBDEMO-THSPORT Backend

This is a Node.js backend for an e-commerce system using MongoDB. It provides RESTful APIs for user authentication, product management, categories/brands, cart, orders, inventory, news/blog, and promotions/discounts.

## Main Features
- User/Auth: Register, login, profile, CRUD, admin
- Product: CRUD, variants, images, inventory, xakho
- Category/Brand: CRUD
- Cart: CRUD
- Order: CRUD, history, snapshot product info
- Inventory: CRUD
- News/Blog: CRUD, tags
- Promotion/Discount: CRUD, filter active

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT, bcrypt
- dotenv

## Getting Started
1. Install dependencies: `npm install`
2. Set up `.env` file with MongoDB URI and JWT secret
3. Run the server: `npm start`

## Folder Structure
- `src/` - Source code
  - `models/` - Mongoose models
  - `controllers/` - Route logic
  - `routes/` - API endpoints
  - `middleware/` - Auth, error handling
  - `utils/` - Helpers
- `config/` - Configuration files
- `public/` - Static assets

## API Documentation
See each module's route file for endpoint details.
