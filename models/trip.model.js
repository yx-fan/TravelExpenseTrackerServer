const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    tripId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripName: { type: String, required: true },
    description: { type: String, required: false, default: ''},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const TripModel = mongoose.model('Trip', TripSchema);
module.exports = TripModel;