const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

const authMiddleware = (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        const err = new Error('No token provided, authorization denied');
        err.statusCode = 401;
        return next(err);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user object to request
        next();
    } catch (err) {
        logger.error(`Invalid token: ${err.message}`);
        err.statusCode = 401;
        next(err);
    }
};

module.exports = authMiddleware;