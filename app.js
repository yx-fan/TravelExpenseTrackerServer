const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
// const kafkaService = require('./config/kafka');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/error.middleware');
const authMiddleware = require('./middlewares/auth.middleware');
const authRoutes = require('./src/api/v1/auth/auth.route');
const RabbitmqProducer = require('./messaging/rabbitmqProducer.service');
const rabbitmqConsumer = require('./messaging/rabbitmqConsumer.service');


// Load environment variables
dotenv.config();

// Connect to database
db.connect();

// Initialize Kafka producer and consumer
// kafkaService.initProducer();
// kafkaService.initConsumer();
rabbitmqConsumer.runConsumer();

const app = express();

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

app.get('/', (req, res) => {
    logger.info('Root endpoint hit');
    res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes);  // Auth routes

if (process.env.NODE_ENV === 'development') {
    // Test error route
    app.get('/error', (req, res, next) => {
        const err = new Error('This is an test error message');
        err.statusCode = 400;
        next(err);
    });

    // Test Kafka producer route
    app.get('/produce/:message', async (req, res) => {
        const message = req.params.message;
        await RabbitmqProducer.sendMessage('test', message);
        // await kafkaService.sendMessage('test', [message]);
        res.send('Test message sent to rabbitmq and kafka');
    });

    // Test of auth middleware, should return 401
    app.get('/protected', authMiddleware, (req, res) => {
        res.send('Authenticated');
    });
}

// Error handler middleware
app.use(errorMiddleware);




// Export app for testing
module.exports = app;