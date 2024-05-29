const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

class Database {
    constructor(uri) {
        this.uri = uri;
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, {
                serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            });
            logger.info("Connected to database");
        } catch (err) {
            logger.error(`Error connecting to database: ${err.message}`);
            setTimeout(() => {
                process.exit(1);  // Exit process to allow docker-compose restart policy to restart the container
            }, 5000);
        }
    }
}

const db = new Database(process.env.MONGO_URI);
module.exports = db;