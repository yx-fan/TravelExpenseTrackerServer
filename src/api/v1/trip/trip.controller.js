const TripService = require('./trip.service');
const CurrencyService = require('../currency/currency.service');
const NotificationService = require('../notification/notification.service');
const customError = require('../../../../utils/customError');

class TripController {

    async createTrip(req, res, next) {
        const { tripName, startDate, endDate, description, currencyCode, image } = req.body;

        try {
            if (!tripName || !startDate || !endDate || !currencyCode) {
                throw new customError('Missing required fields', 400);
            }

            const currency = await CurrencyService.getCurrencyByCode(currencyCode);
            if (!currency) {
                throw new customError('Invalid currency code', 400);
            }
            const trip = await TripService.createTrip(req.user, { tripName, startDate, endDate, description, currency, image });

            // Send notification
            await NotificationService.createNotification(req.user, "Trip Created", `Trip ${trip.tripName} created successfully`, trip.tripId);

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

    async deleteOneTrip(req, res, next) {
        try {
            const tripId = req.params.tripId;
            const trip = await TripService.getTripById(tripId);
            if (!trip) {
                throw new customError('Trip not found', 404);
            }
            await TripService.moveTripToTrash(tripId);

            // Send notification
            await NotificationService.createNotification(req.user, "Trip Deleted", `Trip ${trip.tripName} deleted successfully and can be reverted in 24 hours`, trip.tripId);

            return res.success({}, 'Trip deleted successfully', 200);
        } catch (error) {
            next(error);
        }
    }

    async revertDeletedTrip(req, res, next) {
        try {
            const tripId = req.params.tripId;
            const trip = await TripService.getDeletedTripById(tripId);
            if (!trip) {
                throw new customError('Trip not found', 404);
            }

            await TripService.revertTripFromTrash(tripId);

            // Send notification
            await NotificationService.createNotification(req.user, "Trip Reverted", `Trip ${trip.tripName} reverted successfully`, trip.tripId);

            return res.success({}, 'Trip reverted successfully', 200);
        } catch (error) {
            next(error);
        }
    }

    async getDeletedTrips(req, res, next) {
        try {
            const trips = await TripService.getDeletedTrips(req.user);
            return res.success(trips, 'Deleted trips retrieved successfully', 200);
        } catch (error) {
            next(error);
        }
    }


}

module.exports = new TripController();