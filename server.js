// server.js
require('dotenv').config(); // Optional: If you use a .env file for environment variables
const express = require('express');
const productRoutes = require('./routes/products'); // Task 2: Route module
const loggerMiddleware = require('./middleware/logger'); // Task 3: Logger
const { errorHandler } = require('./middleware/errors'); // Task 4: Global Error Handler

const app = express();
// Task 1: Server listens on port 3000 (or from environment)
const PORT = process.env.PORT || 3000;

// --- Task 3: Global Middleware Implementation ---

// 3a. Custom Logger Middleware
app.use(loggerMiddleware);

// 3b. Middleware to parse JSON request bodies
app.use(express.json()); 

// --- Task 1: Basic "Hello World" Route ---
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the Express.js Product API.');
});

// --- Task 2: Mount RESTful API Routes ---
// All product routes will be prefixed with /api/products
app.use('/api/products', productRoutes);

// --- Task 4: Global Error Handling Middleware ---
// MUST be the last middleware registered
app.use(errorHandler);

// --- Task 1: Start Server ---
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/products`);
});