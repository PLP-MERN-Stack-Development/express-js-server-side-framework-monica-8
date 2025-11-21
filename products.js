// routes/products.js
const express = require('express');
const router = express.Router();
const { products, generateId } = require('../data/products');
const authenticate = require('../middleware/auth');
const validateProduct = require('../middleware/validation');
const { NotFoundError } = require('../middleware/errors');

/** Helper function for asynchronous error handling wrapper (Task 4) */
// This function wraps our route handlers to catch promises/errors and pass them to 'next'
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// --- Task 5d: Product Statistics Route ---
router.get('/stats', asyncHandler(async (req, res) => {
    const stats = products.reduce((acc, product) => {
        acc.totalCount = (acc.totalCount || 0) + 1;
        acc.inStockCount = (acc.inStockCount || 0) + (product.inStock ? 1 : 0);
        
        acc.countByCategory = acc.countByCategory || {};
        acc.countByCategory[product.category] = (acc.countByCategory[product.category] || 0) + 1;

        return acc;
    }, {});

    res.json(stats);
}));

// --- Task 2a & 5a/5b/5c: GET /products (List, Filter, Search, Paginate) ---
router.get('/', asyncHandler(async (req, res) => {
    let filteredProducts = [...products];
    // Destructuring and default values for Task 5
    const { category, search, page = 1, limit = 10 } = req.query; 

    // 5a. Filtering by category
    if (category) {
        const cat = category.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === cat);
    }

    // 5c. Searching by name
    if (search) {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm)
        );
    }

    // 5b. Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const results = {};
    results.total = filteredProducts.length;
    results.data = filteredProducts.slice(startIndex, endIndex);

    // Add navigation links
    if (endIndex < filteredProducts.length) results.next = { page: pageNum + 1, limit: limitNum };
    if (startIndex > 0) results.previous = { page: pageNum - 1, limit: limitNum };

    res.json(results);
}));

// --- Task 2b: GET /products/:id (Get Specific Product) ---
router.get('/:id', asyncHandler(async (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        // Task 4: Custom NotFoundError
        throw new NotFoundError(`Product with id ${req.params.id} not found.`);
    }
    res.json(product);
}));

// --- Task 2c: POST /products (Create Product) ---
// Middleware chain: authenticate (Task 3c) -> validateProduct (Task 3d) -> handler
router.post('/', authenticate, validateProduct, asyncHandler(async (req, res) => {
    const newProduct = {
        id: generateId(),
        ...req.body,
    };
    products.push(newProduct);
    // 201 Created status
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
}));

// --- Task 2d: PUT /products/:id (Update Product) ---
// Middleware chain: authenticate (Task 3c) -> validateProduct (Task 3d) -> handler
router.put('/:id', authenticate, validateProduct, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        throw new NotFoundError(`Product with id ${id} not found for update.`);
    }

    products[productIndex] = {
        ...products[productIndex],
        ...req.body,
        id: id // Ensure ID remains unchanged
    };

    res.json({ message: 'Product updated successfully', product: products[productIndex] });
}));

// --- Task 2e: DELETE /products/:id (Delete Product) ---
// Middleware chain: authenticate (Task 3c) -> handler
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const initialLength = products.length;
    
    // Filter out the product to delete
    products = products.filter(p => p.id !== id);

    if (products.length === initialLength) {
        throw new NotFoundError(`Product with id ${id} not found for deletion.`);
    }

    // Task 4: Proper error responses (204 No Content for successful deletion)
    res.status(204).send(); 
}));

module.exports = router;