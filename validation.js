// middleware/validation.js
const { ValidationError } = require('./errors');

const validateProduct = (req, res, next) => {
    const { name, price, category, inStock } = req.body;

    // Basic Validation Checks (Task 3d)
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        return next(new ValidationError('Product name is required and must be a string of at least 3 characters.'));
    }
    if (typeof price !== 'number' || price <= 0) {
        return next(new ValidationError('Product price must be a positive number.'));
    }
    if (!category || typeof category !== 'string') {
        return next(new ValidationError('Product category is required.'));
    }
    if (typeof inStock !== 'boolean') {
        return next(new ValidationError('Product inStock field must be a boolean.'));
    }

    next();
};

module.exports = validateProduct;