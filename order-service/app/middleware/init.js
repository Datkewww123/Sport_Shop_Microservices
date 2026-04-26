// catalog-service/app/middleware/init.js
// order-service/app/middleware/init.js
const cors = require('cors');
const express = require('express');

module.exports = (app) => {
    app.use(cors({
        origin: function(origin, callback) {
            const allowedOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173')
                .split(',')
                .map(o => o.trim());
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', (req, res, next) => {
        res.charset = 'utf-8';
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        next();
    });
};