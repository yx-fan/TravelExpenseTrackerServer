const mongoose = require('mongoose');
const { create } = require('./inAppNotification.model');

const receiptSchema = new mongoose.Schema({
    ImageUrl: { type: String, required: true, unique: true},
    merchantName: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    location: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Receipt', receiptSchema);