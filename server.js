const RabbitmqConnection = require('./messaging/rabbitmqConnection');
const db = require('./config/db');
const logger = require('./utils/logger');
const CurrencyUpdater = require('./jobs/currencyUpdater');

async function startServer() {
    try {
        // Wait for RabbitMQ connection before starting server
        // 1. Create a new connection to RabbitMQ
        await RabbitmqConnection.getConnection();

        // 2. Connect to database
        await db.connect();

        const { createApp, initializeConsumers } = require('./app');
        // 3. Initialize consumers
        await initializeConsumers();

        // 4. Create the Express app
        const app = await createApp();

        // 5. Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, async () => {
            logger.info(`Server running on port ${PORT}`);
            await CurrencyUpdater.initialize();
        });
    } catch (error) {
        logger.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
}

startServer();