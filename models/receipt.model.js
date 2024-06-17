const mongoose = require('mongoose');
const { create } = require('./inAppNotification.model');

const receiptSchema = new mongoose.Schema({
    receiptId: { type: String, required: true, default: '' },
    ImageUrl: { type: String, required: true, default: ''},
    merchantName: { type: String, required: true, default: '' },
    date: { type: Date, required: true, default: '' },
    amount: { type: Number, required: true, default: 0},
    location: { type: String, required: true, default: '' },
    postalCode: { type: String,required: true, default: ''},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Receipt', receiptSchema);