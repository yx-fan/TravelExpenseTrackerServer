const TripService = require('./trip.service');
const CurrencyService = require('../currency/currency.service');
const customError = require('../../../../utils/customError');
const logger = require('../../../../utils/logger');

class TripController {

    async createTrip(req, res, next) {
        const { tripName, startDate, endDate, description, currencyCode, image } = req.body;
        if (!tripName || !startDate || !endDate || !currencyCode) {
            throw new customError('Missing required fields', 400);
        }

        const currency = await CurrencyService.getCurrencyByCode(currencyCode);
        if (!currency) {
            throw new customError('Invalid currency code', 400);
        }

        try {
            const trip = await TripService.createTrip(req.user, { tripName, startDate, endDate, description, currency, image });
            return res.success(trip, 'Trip created successfully', 201);
        } catch (error) {
            next(error);
        }
    }

    async getTrips(req, res, next) {
        try {
            const trips = await TripService.getTrips(req.user);
            return res.success(trips, 'Trips retrieved successfully', 200);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new TripController();