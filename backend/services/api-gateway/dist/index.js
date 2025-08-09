"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
require("dotenv/config");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Service URLs from environment variables
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL || 'http://localhost:3002';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';
const DRIVER_SERVICE_URL = process.env.DRIVER_SERVICE_URL || 'http://localhost:3004';
// API Gateway Routes
// User Service Routes
app.use('/api/my/user', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/my/user': '/api/my/user'
    },
    onError: (err, req, res) => {
        console.error('User Service Error:', err.message);
        res.status(503).json({ message: 'User service unavailable' });
    }
}));
// Restaurant Service Routes
app.use('/api/my/restaurant', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/my/restaurant': '/api/my/restaurant'
    },
    onError: (err, req, res) => {
        console.error('Restaurant Service Error:', err.message);
        res.status(503).json({ message: 'Restaurant service unavailable' });
    }
}));
// Restaurant Search Routes
app.use('/api/restaurant', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/restaurant': '/api/restaurant'
    },
    onError: (err, req, res) => {
        console.error('Restaurant Service Error:', err.message);
        res.status(503).json({ message: 'Restaurant service unavailable' });
    }
}));
// Order Service Routes
app.use('/api/order', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/order': '/api/order'
    },
    onError: (err, req, res) => {
        console.error('Order Service Error:', err.message);
        res.status(503).json({ message: 'Order service unavailable' });
    }
}));
// Driver Service Routes
app.use('/api/driver', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: DRIVER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/driver': '/api/driver'
    },
    onError: (err, req, res) => {
        console.error('Driver Service Error:', err.message);
        res.status(503).json({ message: 'Driver service unavailable' });
    }
}));
// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API Gateway is running',
        services: {
            userService: USER_SERVICE_URL,
            restaurantService: RESTAURANT_SERVICE_URL,
            orderService: ORDER_SERVICE_URL,
            driverService: DRIVER_SERVICE_URL
        }
    });
});
// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Food Delivery API Gateway' });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
    console.log('Service endpoints:');
    console.log(`- User Service: ${USER_SERVICE_URL}`);
    console.log(`- Restaurant Service: ${RESTAURANT_SERVICE_URL}`);
    console.log(`- Order Service: ${ORDER_SERVICE_URL}`);
    console.log(`- Driver Service: ${DRIVER_SERVICE_URL}`);
});
