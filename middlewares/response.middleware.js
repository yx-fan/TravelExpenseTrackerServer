const responseMiddleware = (req, res, next) => {
    res.success = (data, message = "Request successful", statusCode = 200) => {
        res.status(statusCode).json({
            status: "success",
            message,
            data,
        });
    };

    res.error = (message = "Internal Server Error", statusCode = 500) => {
        res.status(statusCode).json({
            status: "error",
            message,
        });
    };

    next();
}

module.exports = responseMiddleware;