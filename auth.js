// middleware/auth.js
const { AuthenticationError } = require('./errors');

const AUTH_KEY = process.env.API_KEY_SECRET || 'secret-key'; // Uses .env.example value

const authenticate = (req, res, next) => {
    const apiKey = req.header('x-api-key');

    // Task 3: Check for an API key in the request headers
    if (apiKey === AUTH_KEY) {
        next();
    } else {
        // Use custom AuthenticationError (Task 4)
        next(new AuthenticationError('Unauthorized: Missing or invalid API key.'));
    }
};

module.exports = authenticate;