const { createLogger, format, transports } = require('winston');
const dotenv = require('dotenv');

dotenv.config();

class Logger {
    constructor() {
        this.logger = createLogger({
            level: process.env.LOG_LEVEL || "info",
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: "app.log" }),
            ],
        });
    }

    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }

    debug(message) {
        this.logger.debug(message);
    } 
}

module.exports = new Logger();