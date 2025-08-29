import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Service URLs from environment variables
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3006';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL || 'http://localhost:3002';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';
const DRIVER_SERVICE_URL = process.env.DRIVER_SERVICE_URL || 'http://localhost:3004';

// API Gateway Routes

// Auth Service Routes
app.use('/api/auth', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/api/auth'
  },
  onError: (err, req, res) => {
    console.error('Auth Service Error:', err.message);
    res.status(503).json({ message: 'Auth service unavailable' });
  }
}));

// User Service Routes
app.use('/api/my/user', createProxyMiddleware({
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
app.use('/api/my/restaurant', createProxyMiddleware({
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
app.use('/api/restaurant', createProxyMiddleware({
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
app.use('/api/order', createProxyMiddleware({
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
app.use('/api/driver', createProxyMiddleware({
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
      authService: AUTH_SERVICE_URL,
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
  console.log(`- Auth Service: ${AUTH_SERVICE_URL}`);
  console.log(`- User Service: ${USER_SERVICE_URL}`);
  console.log(`- Restaurant Service: ${RESTAURANT_SERVICE_URL}`);
  console.log(`- Order Service: ${ORDER_SERVICE_URL}`);
  console.log(`- Driver Service: ${DRIVER_SERVICE_URL}`);
});
