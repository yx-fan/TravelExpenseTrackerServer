const TripModel = require('../../../../models/trip.model');
const logger = require('../../../../utils/logger');

class TripService {
    
    async createTrip(user, tripData) {
        try {
            let tripId = this._generateTripId();
            let trip = new TripModel({
                tripId,
                user,
                ...tripData
            });
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

    async getTripById(tripId) {
        try {
            const trip = await TripModel.findOne({ tripId });
            return trip;
        } catch (err) {
            logger.error(`Error getting trip by id: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async deleteAllTrips(user) {
        try {
            const trips = await TripModel.deleteMany({ user });
            return trips;
        } catch (err) {
            logger.error(`Error deleting all trips: ${err.message}`);
            throw new Error(err.message);
        }
    }

    _generateTripId() {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000000);
        return `${timestamp}-${randomNum}`;
    }

    
}

module.exports = new TripService();