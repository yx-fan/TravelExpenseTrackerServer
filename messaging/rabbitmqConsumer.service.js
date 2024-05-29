const amqp = require('amqplib');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

class rabbitmqConsumer {
    async runConsumer() {
        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URL);
            const channel = await connection.createChannel();
            const queue = 'test';
            await channel.assertQueue(queue, { durable: true });

            channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    const message = JSON.parse(msg.content.toString());
                    logger.info(`Received message from queue ${queue}: ${message}`);
                    channel.ack(msg);
                }
            });

            logger.info(`Consumer running on queue ${queue}`);
        } catch (err) {
            logger.error(`Error running consumer: ${err.message}`);
            setTimeout(() => {
                this.runConsumer();
            }, 5000);
        }
    }
}

module.exports = new rabbitmqConsumer();