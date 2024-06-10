const RabbitmqConnection = require('./messaging/rabbitmqConnection');
const createApp = require('./app');
const logger = require('./utils/logger');

async function startServer() {
    try {
        // Wait for RabbitMQ connection before starting server
        await RabbitmqConnection.getConnection();

        const app = await createApp();

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