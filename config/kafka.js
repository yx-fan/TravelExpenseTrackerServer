const { Kafka } = require('kafkajs');
const logger = require('../utils/logger');
const dotenv = require('dotenv');

dotenv.config();

class KafkaService {
    constructor() {
        this.kafka = new Kafka({
            clientId: "travel-expense-tracker",
            brokers: [process.env.KAFKA_BROKER],
        });

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: "travel-expense-tracker-group" });
    }

    async initProducer() {
        try {
            await this.producer.connect();
            logger.info("Connected to Kafka producer");
        } catch (err) {
            logger.error(`Error connecting to Kafka producer: ${err.message}`);
        }
    }

    async sendMessage(topic, messages) {
        try {
            await this.producer.send({
                topic: topic,
                messages: messages.map(message => ({ value: message })),
            });
            logger.info(`Sent message to topic ${topic}`);
        } catch (err) {
            logger.error(`Error sending message to Kafka: ${err.message}`);
        }
    }

    async initConsumer() {
        try {
            await this.consumer.connect();
            logger.info("Connected to Kafka consumer");

            await this.consumer.subscribe({ topic: "test" });

            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    logger.info(`Received message: ${message.value.toString()}`);
                },
            });
        } catch (err) {
            logger.error(`Error connecting to Kafka consumer: ${err.message}`);
        }
    }
}

const kafkaService = new KafkaService();
module.exports = kafkaService;