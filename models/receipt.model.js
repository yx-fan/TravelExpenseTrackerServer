const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    receiptId: { type: String, required: true, default: '' },
    merchantName: { type: String, default: '' },
    date: { type: Date, default: '' },
    amount: { type: Number, default: 0},
    location: { type: String, default: '' },
    postalCode: { type: String, default: ''},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    imageUrl: { type: String, default: ''},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Receipt', receiptSchema);