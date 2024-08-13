const TripModel = require('../../../../models/trip.model');
const TripDeleteModel = require('../../../../models/trip.delete.model');
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

    async moveTripToTrash(tripId) {
        try {
            const trip = await TripModel.findOne({ tripId });
    
            // Create a plain object from the trip document
            const tripData = trip.toObject();
            let tripDelete = new TripDeleteModel(tripData);
            
            tripDelete = await tripDelete.save();
            await TripModel.deleteOne({ tripId });
            
            return tripDelete;
        } catch (err) {
            logger.error(`Error moving trip to trash: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async getDeletedTripById(tripId) {
        try {
            const tripDelete = await TripDeleteModel.findOne({ tripId });
            return tripDelete;
        } catch (err) {
            logger.error(`Error getting deleted trip by id: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async revertTripFromTrash(tripId) {
        try {
            const tripDelete = await TripDeleteModel.findOne({ tripId });

            // Create a plain object from the trip delete document
            const tripData = tripDelete.toObject();
            let trip = new TripModel(tripData);

            trip = await trip.save();
            await TripDeleteModel.deleteOne({ tripId });

            return trip;
        } catch (err) {
            logger.error(`Error reverting trip from trash: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async getDeletedTrips(user) {
        try {
            const trips = await TripDeleteModel.find({ user });
            return trips;
        } catch (err) {
            logger.error(`Error getting deleted trips: ${err.message}`);
            throw new Error(err.message);
        }
    }

    async updateTrip(tripId, tripData) {
        try {
            const trip = await TripModel.findOneAndUpdate({ tripId }, tripData, { new: true });
            return trip;
        } catch (err) {
            logger.error(`Error updating trip: ${err.message}`);
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