const TripModel = require('../../../../models/trip.model');
const logger = require('../../../../utils/logger');

class TripService {
    
    async createTrip(user, tripData) {
        try {
            let trip = new TripModel({ user, ...tripData });
            trip = await trip.save();
            return trip;
        } catch (err) {
            logger.error(`Error creating trip: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async getTrips(user) {
        try {
            const trips = await TripModel.find({ user });
            return trips;
        } catch (err) {
            logger.error(`Error getting trips: ${err.message}`);
            throw new Error(err.message);
        }
    }
}

module.exports = new TripService();