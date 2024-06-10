const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/error.middleware');
const passport = require('./config/passport');
const authRoutes = require('./src/api/v1/auth/auth.route');
const ConsumerManager = require('./messaging/consumerManager.service');
const ProducerManager = require('./messaging/producerManager.service');


// Load environment variables
dotenv.config();

// Connect to database
db.connect();

// Initialize rabbitmq consumer
ConsumerManager.startAllConsumers();

const app = express();

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(passport.initialize());  // Initialize passport

app.get('/', (req, res) => {
    logger.info('Root endpoint hit');
    res.send('Welcome to the API');
});

app.use('/api/v1/auth', authRoutes);  // Auth routes

// Development routes
if (process.env.NODE_ENV === 'development') {
    // Test error route
    app.get('/error', (req, res, next) => {
        const err = new Error('This is an test error message');
        err.statusCode = 400;
        next(err);
    });

    // Test RabbitMQ send and receive message
    app.get('/produce/:message', async (req, res) => {
        const message = req.params.message;
        await ProducerManager.sendMessage('test', message);
        res.send('Test message sent to RabbitMQ');
    });

    // Test of auth middleware, should return 401
    app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.send('Authenticated');
    });
}

// Error handler middleware
app.use(errorMiddleware);



// Export app for testing
module.exports = app;