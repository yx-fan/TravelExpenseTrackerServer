const RabbitmqConnection = require('../rabbitmqConnection');
const EmailVerificationService = require('../../src/api/v1/auth/emailVerification.service');
const logger = require('../../utils/logger');

class EmailConsumer {
    async run() {
        try {
            const connection = await RabbitmqConnection.getConnection();
            const channel = await connection.createChannel();
            const queue = 'email';
            await channel.assertQueue(queue, { durable: true });

            channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    const message = JSON.parse(msg.content.toString());
                    logger.info(`Received message from queue ${queue}: ${message}`);
                    await EmailVerificationService.sendVerificationEmail(message.email, message.type);
                    channel.ack(msg);
                }
            });

            logger.info(`Email consumer running on queue ${queue}`);
        } catch (error) {
            logger.error(`Error running email consumer: ${error.message}`);
            setTimeout(() => {
                this.run();
            }, 5000);
        }
    }
}

module.exports = new EmailConsumer();
