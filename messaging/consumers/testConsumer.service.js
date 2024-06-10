const RabbitmqConnection = require('../rabbitmqConnection');
const logger = require('../../utils/logger');

class TestConsumer {
    async run() {
        try {
            const connection = await RabbitmqConnection.getConnection();
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

            logger.info(`Test consumer running on queue ${queue}`);
        } catch (error) {
            logger.error(`Error running test consumer: ${error.message}`);
            setTimeout(() => {
                this.run();
            }, 5000);
        }
    }
}

module.exports = new TestConsumer();
