// middleware/errors.js

/** Custom Error Classes (Task 4) */
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class ValidationError extends CustomError {
    constructor(message = 'Invalid request data') {
        super(message, 400);
    }
}

class AuthenticationError extends CustomError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}

/** Global Error Handling Middleware (Task 4) */
const errorHandler = (err, req, res, next) => {
    // Default status is 500 Internal Server Error
    const status = err.status || 500;
    const message = err.message || 'An unexpected server error occurred.';

    console.error(`[ERROR] ${new Date().toISOString()} ${req.method} ${req.originalUrl}: ${message}`);
    
    // Send proper error response
    res.status(status).json({
        error: {
            name: err.name,
            message: message,
            status: status,
        }
    });
};

module.exports = {
    NotFoundError,
    ValidationError,
    AuthenticationError,
    errorHandler
};