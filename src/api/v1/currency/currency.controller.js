const CurrencyService = require('./currency.service');

class CurrencyController {
    async getCurrencies(req, res, next) {
        try {
            const currencies = await CurrencyService.getCurrencies();
            return res.success({ currencies }, 'Currencies retrieved successfully', 200);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new CurrencyController();