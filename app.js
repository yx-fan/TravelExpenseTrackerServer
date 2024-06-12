const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/error.middleware');
const passport = require('./config/passport');
const authRoutes = require('./src/api/v1/auth/auth.route');
const ConsumerManager = require('./messaging/consumerManager.service');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

dotenv.config();  // Load environment variables

async function createApp() {

    // Connect to database
    db.connect();
    const app = express();

    // Middleware
    app.use(express.json());  // Parse JSON bodies
    app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
    app.use(passport.initialize());  // Initialize passport
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Swagger UI

    app.get('/', (req, res) => {
        logger.info('Root endpoint hit');
        res.send('Welcome to Travel Expense APP API');
    });

    app.use('/api/v1/auth', authRoutes);  // Auth routes

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