const RabbitmqConnection = require('./rabbitmqConnection');
const logger = require('../utils/logger');

class ProducerManager {

    constructor() {
        this.channel = null;  // Only one channel is needed for all producers
    }

    async getChannel() {
        if (this.channel) {
            return this.channel;
        }

        try {
            const connection = await RabbitmqConnection.getConnection();
            this.channel = await connection.createChannel();
            return this.channel;
        } catch (error) {
            logger.error(`Error creating channel: ${error.message}`);
            throw error;
        }
    }

    async sendToQueue(queue, message) {
        try {
            const channel = await this.getChannel();
            await channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            logger.info(`Sent message to queue ${queue}: ${message}`);
        } catch (err) {
            logger.error(`Error sending message to RabbitMQ: ${err.message}`);
        }
    }

}


module.exports = new ProducerManager();