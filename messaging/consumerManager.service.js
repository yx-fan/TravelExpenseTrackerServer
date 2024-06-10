const EmailConsumer = require('./consumers/emailConsumer.service');
const TestConsumer = require('./consumers/testConsumer.service');
const logger = require('../utils/logger');

class ConsumerManager {
    constructor() {
        this.consumers = [
            EmailConsumer,
            TestConsumer
        ];
    }

    async startAllConsumers() {
        this.consumers.forEach(async consumer => {
            try {
                logger.info(`Started consumer: ${consumer.constructor.name}`);
                await consumer.run();
            } catch (error) {
                logger.error(`Error starting consumer: ${error.message}`);
            }
        });
    }

}

module.exports = new ConsumerManager();
