const amqp = require('amqplib');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

class RabbitmqProducer {

    async sendMessage(queue, message) {
        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URL);
            const channel = await connection.createChannel();
            await channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            logger.info(`Sent message to queue ${queue}: ${message}`);
            setTimeout(() => {
                connection.close();
            }, 500);
        } catch (err) {
            logger.error(`Error sending message to RabbitMQ: ${err.message}`);
        }

    };

}


module.exports = new RabbitmqProducer();