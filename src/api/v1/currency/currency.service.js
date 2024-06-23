const CurrencyModel = require('../../../../models/currency.model');
const logger = require('../../../../utils/logger');

class CurrencyService {
    async getCurrencies() {
        try {
            const currencies = await CurrencyModel.find();
            return currencies;
        } catch (err) {
            logger.error(`Error getting currencies: ${err.message}`);
            throw new Error(err.message);
        }
    }

}

module.exports = new CurrencyService();