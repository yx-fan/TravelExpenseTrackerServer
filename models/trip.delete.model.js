const mongoose = require('mongoose');

const TripDeleteSchema = new mongoose.Schema({
    tripId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripName: { type: String, required: true },
    description: { type: String, required: false, default: ''},
    image: { type: String, required: false, default: ''},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    totalAmount: { type: Number, required: true, default: 0 },
    totalNumberOfExpenses: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const TripDeleteModel = mongoose.model('TripDelete', TripDeleteSchema);
module.exports = TripDeleteModel;