const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/error.middleware');
const responseMiddleware = require('./middlewares/response.middleware');
const passport = require('./config/passport');
const authRoutes = require('./src/api/v1/auth/auth.route');
const userRoutes = require('./src/api/v1/user/user.route');
const notificationRoutes = require('./src/api/v1/notification/notification.route');
const tripRoutes = require('./src/api/v1/trip/trip.route');
const receiptRoutes = require('./src/api/v1/receipt/receipt.route');
const expenseRoutes = require('./src/api/v1/expense/expense.route');
const ConsumerManager = require('./messaging/consumerManager.service');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config();  // Load environment variables

async function createApp() {

    const app = express();

    // Middleware
    app.use(cors());  // Enable CORS
    app.use(express.json());  // Parse JSON bodies
    app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
    app.use(passport.initialize());  // Initialize passport
    app.use(responseMiddleware);  // Custom response middleware
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Swagger UI

    app.get('/', (req, res) => {
        logger.info('Root endpoint hit');
        res.send('Welcome to Travel Expense APP API');
    });

    // Routes
    app.use('/api/v1/auth', authRoutes);  // Auth routes
    app.use('/api/v1/user', userRoutes);  // User routes
    app.use('/api/v1/notification', notificationRoutes);  // Notification routes
    app.use('/api/v1/trip', tripRoutes);  // Trip routes
    app.use('/api/v1/receipt', receiptRoutes);  // Receipt routes
    app.use('/api/v1/expense', expenseRoutes);  // Expense routes

    // Load test routes only in development environment
    if (process.env.NODE_ENV === 'development') {
        const testRoutes = require('./test/testRoutes');
        app.use('/test', testRoutes);
    }

    // Error handler middleware
    app.use(errorMiddleware);

    return app;
}

async function initializeConsumers() {
    await ConsumerManager.startAllConsumers();
}

module.exports = {
    createApp,
    initializeConsumers
};