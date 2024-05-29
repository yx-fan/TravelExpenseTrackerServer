const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {

    logger.error(err.message);

    const statusCode = err.statusCode || 500;
    const response = {
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Internal Server Error',
    };

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorMiddleware;