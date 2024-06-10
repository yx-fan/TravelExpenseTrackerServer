const amqp = require('amqplib');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

class RabbitMQConnection {
    constructor() {
        this.connection = null;  // Store the connection object
    }

    async getConnection() {

        // Return the connection object if it already exists
        if (this.connection) {
            return this.connection;
        }

        // Create a new connection if it doesn't exist
        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URL);
            return connection;
        } catch (error) {
            logger.error(`Error connecting to RabbitMQ: ${error.message}`);
            setTimeout(() => {
                this.getConnection();
            }, 5000); // Retry connection after 5 seconds
            throw error;
        }
    }
}

module.exports = new RabbitMQConnection();
