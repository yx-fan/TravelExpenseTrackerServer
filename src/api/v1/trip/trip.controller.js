const TripService = require('./trip.service');
const customError = require('../../../../utils/customError');
const logger = require('../../../../utils/logger');

class TripController {

    async createTrip(req, res, next) {
        const { tripName, startDate, endDate, description } = req.body;
        if (!tripName || !startDate || !endDate) {
            throw new customError('Missing required fields', 400);
        }

        try {
            const trip = await TripService.createTrip(req.user, { tripName, startDate, endDate, description });
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