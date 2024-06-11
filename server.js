const RabbitmqConnection = require('./messaging/rabbitmqConnection');
const { createApp, initializeConsumers } = require('./app');
const logger = require('./utils/logger');

async function startServer() {
    try {
        // Wait for RabbitMQ connection before starting server
        // 1. Create a new connection to RabbitMQ
        await RabbitmqConnection.getConnection();

        // 2. Initialize consumers
        await initializeConsumers();

        // 3. Create the Express app
        const app = await createApp();

        // 4. Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
}

startServer();