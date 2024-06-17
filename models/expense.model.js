const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String, required: false, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' },
    additionalImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdditionalImage' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ExpenseModel = mongoose.model('Expense', expenseSchema);

module.exports = ExpenseModel;