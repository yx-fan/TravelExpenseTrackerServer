const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: { type: Number, required: true, default: 9},
    merchantName: { type: String, default: ''},
    date: { type: Date, default: '' },
    amount: { type: Number, default: 0},
    location: { type: String, default: '' },
    postalCode: { type: String, default: ''},
    description: { type: String, default: '' },
    longitude: { type: Number, default: 0 },
    latitude: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt', required: true},
    additionalImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdditionalImage' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ExpenseModel = mongoose.model('Expense', expenseSchema);

module.exports = ExpenseModel;