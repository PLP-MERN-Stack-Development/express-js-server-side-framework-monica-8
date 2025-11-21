// middleware/logger.js

const loggerMiddleware = (req, res, next) => {
    // Task 3: Logs the request method, URL, and timestamp
    console.log(`[LOG] ${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
};

module.exports = loggerMiddleware;