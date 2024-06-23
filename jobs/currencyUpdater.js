const axios = require('axios');
const cron = require('cron');
const CurrencyModel = require('../models/currency.model'); 
const db = require('../config/db');
const dotenv = require('dotenv');
const logger = require('../utils/logger');   

dotenv.config();

class CurrencyUpdater {
    constructor() {
        this.apiKey = process.env.OPEN_EXCHANGE_RATES_API_KEY;
        this.cronExpression = '0 0 0 * * 0';
    }

    async fetchAndUpdateCurrencies() {
        try {
            const response = await axios.get(`https://openexchangerates.org/api/currencies.json?app_id=${this.apiKey}`);
            const currencies = response.data;

            for (const [code, name] of Object.entries(currencies)) {
                await CurrencyModel.findOneAndUpdate(
                    { code },
                    { code, name },
                    { upsert: true, new: true }
                );
            }
            logger.info('Currencies updated successfully');
        } catch (error) {
            logger.error(`Error updating currencies: ${error.message}`);
        }
    };

    async scheduleJob() {
        await this.fetchAndUpdateCurrencies();
        const job = new cron.CronJob(this.cronExpression, this.fetchAndUpdateCurrencies.bind(this), null, true, 'America/Los_Angeles');
        job.start();
        logger.info('Scheduled currency update job');
    }

    async initialize() {
        await db.connect();
        await this.scheduleJob();
    }
}

module.exports = new CurrencyUpdater();